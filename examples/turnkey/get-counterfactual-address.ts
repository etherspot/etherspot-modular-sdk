import { TurnkeyClient } from "@turnkey/http";
import { ApiKeyStamper } from "@turnkey/sdk-server";
import { createAccount } from "@turnkey/viem";
import { EtherspotBundler, ModularSdk } from "../../src";
import { createWalletClient, http } from "viem";
import { polygonAmoy } from "viem/chains";

// example script to get etherspot smart wallet address using a turnkey client.
async function main() {
    const turnkeyClient = new TurnkeyClient(
        { baseUrl: "https://api.turnkey.com" },
        new ApiKeyStamper({
            apiPrivateKey: "", // turnkey api private key
            apiPublicKey: "" // turnkey api public key
        })
    );

    const turnkeyAccount = await createAccount({
        client: turnkeyClient,
        organizationId: "", // turnkey organization id
        signWith: "", // wallet address created using ./create-wallet.ts
    });

    const walletClient = createWalletClient({
        transport: http("https://testnet-rpc.etherspot.io/v2/80002"),
        account: turnkeyAccount,
        chain: polygonAmoy
    });
    
    const bundlerApiKey = 'etherspot_public_key';

    const modularSdk = new ModularSdk(
        walletClient,
        {
            chainId: 80002,
            bundlerProvider: new EtherspotBundler(
                80002,
                bundlerApiKey,
            )
        }
    );

    const address = await modularSdk.getCounterFactualAddress();
    console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());