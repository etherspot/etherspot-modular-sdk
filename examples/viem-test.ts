import * as dotenv from 'dotenv';
import { getWalletClient } from '../src/sdk/common/viem-utils';
dotenv.config();

// npx ts-node examples/viem-test.ts
async function main() {
    const walletClient = getWalletClient({ rpcUrl: 'https://testnet-rpc.etherspot.io/v1/11155111', privateKey: process.env.WALLET_PRIVATE_KEY as string });
    const getAddressesReturnType = await walletClient.getAddresses();
    console.log(`getAddressesReturnType: ${JSON.stringify(getAddressesReturnType)}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
