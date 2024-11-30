import { DEFAULT_ETHEREUM_ACCOUNTS, Turnkey } from '@turnkey/sdk-server';

const turnkey = new Turnkey({
    apiBaseUrl: "https://api.turnkey.com",
    apiPrivateKey: "", // turnkey api private key
    apiPublicKey: "", // turnkey api public key
    defaultOrganizationId: "", // default organization id
});

const apiClient = turnkey.apiClient();

async function main() {
    const walletResponse = await apiClient.createWallet({
        walletName: 'Example Wallet 1',
        accounts: DEFAULT_ETHEREUM_ACCOUNTS,
    });
      
    const walletId = walletResponse.walletId;
    const accountAddress = walletResponse.addresses[0];

    console.log('\x1b[33m%s\x1b[0m', 'walletId: ', walletId);
    console.log('\x1b[33m%s\x1b[0m', 'accountAddress: ', accountAddress);
    return;
}

main()
  .catch(console.error)
  .finally(() => process.exit());