import * as dotenv from 'dotenv';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { Address, createPublicClient, Hex, http } from 'viem';
import { sepolia } from 'viem/chains';

dotenv.config();

// tsx examples/basics/get-address.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get EtherspotWallet address...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const typedData = {
    domain: {
    name: 'EtherspotModular',
    version: '1.0.0',
    chainId: 11155111,
    verifyingContract: `0x${address.slice(2)}` as Address,
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  }

  const signTypedData = await modularSdk.signTypedData(typedData);
  const sign = await modularSdk.signMessage({message: 'Hello'})

  console.log('signature: ', sign, signTypedData);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://testnet-rpc.etherspot.io/v2/11155111?api-key=${bundlerApiKey}`),
  })

	console.log(await publicClient.verifyMessage({
		address: address as Address,
		signature: sign as Hex,
    message: 'Hello'
	}))

  console.log(await publicClient.verifyTypedData({
    address: address as Address,
    domain: typedData.domain,
    types: typedData.types,
    primaryType: 'Mail',
    message: typedData.message,
    signature: signTypedData as Hex,
  }))

}

main()
  .catch(console.error)
  .finally(() => process.exit());
