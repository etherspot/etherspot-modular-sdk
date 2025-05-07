import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import { defineChain, parseEther } from 'viem';
import { EtherspotBundler, ModularSdk } from '../../src';

dotenv.config();

const recipient = '0x80a1874E1046B1cc5deFdf4D3153838B72fF94Ac'; // recipient wallet address
const value = '0.0000001'; // transfer value
const bundlerApiKey = 'etherspot_public_key';
const bundlerUrl = 'https://testnet-rpc.etherspot.io/v2/84532'; // bundler url
const chainId = 84532; // chain id
const entryPointAddress = '0x0000000071727De22E5E9d8BAf0edAc6f37da032'; // entry point address
const walletFactoryAddress = '0x2A40091f044e48DEB5C0FCbc442E443F3341B451'; // wallet factory address
const bootstrapAddress = '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA'; // bootstrap address
const multipleOwnerECDSAValidatorAddress = '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906'; // multi owner ECDSA validator factory address

// tsx examples/basics/custom-chain.ts
async function main() {
  // for custom chains, you can use the following code to create a chain object
  const chain = defineChain({
    id: chainId,
    name: "Base sepolia Testnet",
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH'
    },
    rpcUrls: {
      default: {
        http: ['https://sepolia.base.org'] // RPC URL
      }
    }
  })
  // initializating sdk...
  const modularSdk = new ModularSdk(
    process.env.WALLET_PRIVATE_KEY as string,
    {
      chain: chain,
      chainId: chainId,
      bundlerProvider: new EtherspotBundler(chainId, bundlerApiKey, bundlerUrl),
      index: 0,
      entryPointAddress,
      walletFactoryAddress,
      bootstrapAddress,
      multipleOwnerECDSAValidatorAddress,
      rpcProviderUrl: bundlerUrl,
    })


  // get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  const transactionBatch = await modularSdk.addUserOpsToBatch({ to: recipient, value: parseEther(value) });
  console.log('transactions: ', transactionBatch);

  // get balance of the account address
  const balance = await modularSdk.getNativeBalance();

  console.log('balances: ', balance);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await modularSdk.estimate();
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp and sending to the bundler...
  const uoHash = await modularSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt: string | null = null;
  const timeout = Date.now() + 1200000; // 1 minute timeout
  while ((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
