import * as dotenv from 'dotenv';
import { getViemAccount, getWalletClientFromPrivateKey } from '../src/sdk/common/viem-utils';
import { privateKeyToAccount } from 'viem/accounts';
dotenv.config();

// npx ts-node examples/viem-test.ts
async function main() {
    const walletClient = getWalletClientFromPrivateKey({ rpcUrl: 'https://testnet-rpc.etherspot.io/v1/11155111', privateKey: process.env.WALLET_PRIVATE_KEY as string });
    const getAddressesReturnType = await walletClient.getAddresses();
    console.log(`getAddressesReturnType: ${JSON.stringify(getAddressesReturnType)}`);

  
    const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
    console.log(`account: ${JSON.stringify(account)}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
