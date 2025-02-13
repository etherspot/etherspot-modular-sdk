import { TurnkeyClient } from "@turnkey/http";
import { ApiKeyStamper } from "@turnkey/sdk-server";
import { createAccount } from "@turnkey/viem";
import { EtherspotBundler, ModularSdk } from "../../src";
import { createWalletClient, http, parseEther } from "viem";
import { polygonAmoy } from "viem/chains";

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

    const recipient = '0x09FD4F6088f2025427AB1e89257A44747081Ed59'; // recipient wallet address
    const value = '0.0000001'; // transfer value

    await modularSdk.clearUserOpsFromBatch();


    // add transactions to the batch
    const transactionBatch = await modularSdk.addUserOpsToBatch({ to: recipient, value: parseEther(value) });
    console.log('transactions: ', transactionBatch);

    // get balance of the account address
    const balance = await modularSdk.getNativeBalance();
    console.log('balances: ', balance);

    // estimate transactions added to the batch and get the fee data for the UserOp
    const op = await modularSdk.estimate();
    console.log(`Estimate UserOp:`, op);

    // sign the UserOp and sending to the bundler...
    const uoHash = await modularSdk.send(op);
    console.log(`UserOpHash: ${uoHash}`);

    // get transaction hash...
    console.log('Waiting for transaction...');
    let userOpsReceipt = null;
    const timeout = Date.now() + 1200000; // 1 minute timeout
    while ((userOpsReceipt == null) && (Date.now() < timeout)) {
        userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
    }
    console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}
main()
  .catch(console.error)
  .finally(() => process.exit());