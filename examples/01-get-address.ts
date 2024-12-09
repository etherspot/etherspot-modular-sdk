import { ethers } from 'ethers';
import { EtherspotBundler, ModularSdk } from '../src';
import * as dotenv from 'dotenv';
import { verifyMessage } from '@ambire/signature-validator';

dotenv.config();

// npx ts-node examples/01-get-address.ts
async function main() {
  const bundlerApiKey =
    'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  const customBundlerUrl = '';
  // initializating sdk...
  const modularSdk = new ModularSdk(
    { privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey, customBundlerUrl),
    },
  ); // Testnets dont need apiKey on bundlerProvider

  // get EtherspotWallet address...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const typedData = {
    domain: {
      name: 'EtherspotModular',
      version: '1.0.0',
      chainId: 11155111,
      verifyingContract: address,
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
  };

  const provider = new ethers.providers.JsonRpcProvider(
    'https://eth-sepolia.g.alchemy.com/v2/sWnVGwwXOis6M_hpOr9mCrT4l_wNjANA',
  );

  // verify typed data
  console.log(
    'Sign typed data',
    await verifyMessage({
      provider,
      signer: address,
      signature: await modularSdk.signTypedData(typedData),
      typedData: typedData,
    }),
  );

  // verify message
  console.log(
    'Sign message',
    await verifyMessage({
      provider,
      signer: address,
      message: 'My funds are SAFU with Ambire Wallet',
      signature: await modularSdk.signMessage({ message: 'My funds are SAFU with Ambire Wallet' }),
    }),
  );
}

main()
  .catch(console.error)
  .finally(() => process.exit());
