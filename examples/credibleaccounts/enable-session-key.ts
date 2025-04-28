import { EtherspotBundler } from '../../src';
import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import {
  encodeAbiParameters,
  encodeFunctionData,
  Hex,
  http,
  parseAbiItem,
  parseAbiParameters,
  PublicClient,
} from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { getPublicClient } from '../../src/sdk/common/utils/viem-utils';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

const bundlerApiKey = 'etherspot_public_key';
const SEPOLIA_CHAIN_ID = '11155111';
const CREDIBLE_ACCOUNT_VALIDATOR_ADDRESS = '0xcCeE6e4191632F3dcF3194D53fA892cF96c8Ee59'; // SEPOLIA
const getEpochTimeInSeconds = () => Math.floor(new Date().getTime() / 1000);

// TokenData and ResourceLock structs
interface TokenData {
  token: `0x${string}`;
  amount: bigint;
}

interface ResourceLock {
  chainId: bigint;
  smartWallet: `0x${string}`;
  sessionKey: `0x${string}`;
  validAfter: number;
  validUntil: number;
  tokenData: TokenData[];
  nonce: bigint;
}

async function main() {
  // Init SDK
  const bundlerProvider = new EtherspotBundler(Number(SEPOLIA_CHAIN_ID), bundlerApiKey);
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
    Number(SEPOLIA_CHAIN_ID),
    bundlerApiKey,
  );

  // Init public client
  const publicClient = getPublicClient({
    chainId: Number(SEPOLIA_CHAIN_ID),
    transport: http(bundlerProvider.url),
  }) as PublicClient;

  // Get counterfactual of ModularEtherspotWallet...
  const address: Hex = (await modularSdk.getCounterFactualAddress()) as Hex;
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
  // Get native balance
  const balance = await modularSdk.getNativeBalance();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet native balance: ${balance}`);
  // Clear existing UserOps from batch
  await modularSdk.clearUserOpsFromBatch();

  /*//////////////////////////////////////////////////////////////
                        ENABLE SESSION KEY
  //////////////////////////////////////////////////////////////*/

  // Generate a new session key using viem
  const sessionKeyPrivate = generatePrivateKey();
  const sessionKeyAccount = privateKeyToAccount(sessionKeyPrivate);
  const sessionKeyAddress = sessionKeyAccount.address;
  console.log('\x1b[33m%s\x1b[0m', `Generated session key: ${sessionKeyAddress}`);
  console.log('\x1b[33m%s\x1b[0m', `Session key private key: ${sessionKeyPrivate}`);

  // Set up the ResourceLock parameters
  const chainId = BigInt(SEPOLIA_CHAIN_ID); // Sepolia by default
  const currentTime = getEpochTimeInSeconds();
  const validAfter = BigInt(currentTime); // Valid from now
  const validUntil = BigInt(currentTime + 30 * 24 * 60 * 60); // Valid for 30 days
  const nonce = BigInt(0); // Nonce is 0 for the first lock

  // Define the token(s) to lock
  const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // SEPOLIA USDC
  const USDC_AMOUNT = 1000000; // 1 USDC
  const tokenData: TokenData[] = [
    {
      token: USDC_ADDRESS as `0x${string}`, // Cast to the correct type
      amount: BigInt(USDC_AMOUNT),
    },
  ];

  // Create the ResourceLock object
  const resourceLock: ResourceLock = {
    chainId,
    smartWallet: address as `0x${string}`,
    sessionKey: sessionKeyAddress as `0x${string}`,
    validAfter: Number(validAfter),
    validUntil: Number(validUntil),
    tokenData: tokenData.map((td) => ({
      token: td.token as `0x${string}`,
      amount: td.amount,
    })),
    nonce: nonce,
  };
  console.log('\x1b[33m%s\x1b[0m', `ResourceLock.chainId: ${resourceLock.chainId}`);
  console.log('\x1b[33m%s\x1b[0m', `ResourceLock.smartWallet: ${resourceLock.smartWallet}`);
  console.log('\x1b[33m%s\x1b[0m', `ResourceLock.sessionKey: ${resourceLock.sessionKey}`);
  console.log('\x1b[33m%s\x1b[0m', `ResourceLock.validAfter: ${resourceLock.validAfter}`);
  console.log('\x1b[33m%s\x1b[0m', `ResourceLock.validUntil: ${resourceLock.validUntil}`);
  console.log('\x1b[33m%s\x1b[0m', `ResourceLock.nonce: ${resourceLock.nonce}`);

  // Encode the ResourceLock struct
  const encodedResourceLock = encodeAbiParameters(
    parseAbiParameters('(uint256,address,address,uint48,uint48,(address,uint256)[],uint256)'),
    [
      [
        resourceLock.chainId,
        resourceLock.smartWallet,
        resourceLock.sessionKey,
        resourceLock.validAfter,
        resourceLock.validUntil,
        resourceLock.tokenData.map((td) => [td.token, td.amount] as const),
        resourceLock.nonce,
      ],
    ],
  );
  console.log('\x1b[33m%s\x1b[0m', `encodedResourceLock: ${encodedResourceLock}`);

  // Encode the function call to enableSessionKey
  const enableSessionKeyCalldata = encodeFunctionData({
    abi: [
      {
        name: 'enableSessionKey',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ name: '_data', type: 'bytes' }],
        outputs: [],
      },
    ],
    functionName: 'enableSessionKey',
    args: [encodedResourceLock as `0x${string}`],
  });
  console.log('\x1b[33m%s\x1b[0m', `enableSessionKeyCalldata: ${enableSessionKeyCalldata}`);

  // Clear previous batch and add new transaction
  await modularSdk.clearUserOpsFromBatch();
  await modularSdk.addUserOpsToBatch({
    to: CREDIBLE_ACCOUNT_VALIDATOR_ADDRESS,
    value: 0,
    data: enableSessionKeyCalldata,
  });
  console.log('\x1b[33m%s\x1b[0m', `before estimate:`);

  /*//////////////////////////////////////////////////////////////
                      ESTIMATE/SEND USER OP
  //////////////////////////////////////////////////////////////*/

  // Estimate UserOp
  const op = await modularSdk.estimate();
  console.log(`Estimate UserOp: ${await printOp(op)}`);
  // Send UserOp
  const uoHash = await modularSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);
  // Await transaction hash
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 1200000; // 1 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);

  /*//////////////////////////////////////////////////////////////
                  CHECK SESSION KEY IS ENABLED
  //////////////////////////////////////////////////////////////*/

  const isEnabledCallData = encodeFunctionData({
    abi: [
      {
        name: 'hasSessionKey',
        type: 'function',
        stateMutability: 'view',
        inputs: [
          { name: '_wallet', type: 'address' },
          { name: '_sessionKey', type: 'address' },
        ],
        outputs: [{ name: '', type: 'bool' }],
      },
    ],
    functionName: 'hasSessionKey',
    args: [address as `0x${string}`, sessionKeyAddress as `0x${string}`],
  });

  const isEnabledReturn = await publicClient.call({
    to: CREDIBLE_ACCOUNT_VALIDATOR_ADDRESS as `0x${string}`,
    data: isEnabledCallData,
  });

  const isEnabled = Boolean(parseInt(isEnabledReturn.data as string, 16));
  console.log('\x1b[33m%s\x1b[0m', `Session key enabled for wallet: ${isEnabled}`);

  if (!isEnabled) {
    console.error('\x1b[31m%s\x1b[0m', `Session key not enabled for wallet. Cannot add hook.`);
    return;
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit());
