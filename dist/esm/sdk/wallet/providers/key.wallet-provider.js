import { createWalletClient, http, concat, encodeAbiParameters, parseAbiParameters, hashMessage, toBytes } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { Networks } from '../../network/index.js';
export class KeyWalletProvider {
    constructor(chainId, privateKey) {
        this.type = 'Key';
        this.wallet = createWalletClient({
            account: privateKeyToAccount(privateKey),
            chain: Networks[chainId].chain,
            transport: http()
        });
        const { address } = this.wallet.account;
        this.address = address;
    }
    async signMessage(message, validatorAddress, factoryAddress, initCode) {
        const signature = await this.wallet.signMessage({
            message: { raw: toBytes(hashMessage({ raw: toBytes(message) })) },
            account: this.wallet.account
        });
        if (initCode !== '0x') {
            const abiCoderResult = encodeAbiParameters(parseAbiParameters('address, bytes, bytes'), [factoryAddress, initCode, concat([validatorAddress, signature])]);
            return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492'; //magicBytes
        }
        return concat([
            validatorAddress,
            signature
        ]);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
        const signature = await this.wallet.signTypedData({
            domain: msg.domain,
            types: msg.types,
            primaryType: msg.primaryType,
            message: msg.message,
            account: this.wallet.account
        });
        if (initCode !== '0x') {
            const abiCoderResult = encodeAbiParameters(parseAbiParameters('address, bytes, bytes'), [factoryAddress, initCode, concat([validatorAddress, signature])]);
            return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492'; //magicBytes
        }
        return concat([
            validatorAddress,
            signature
        ]);
    }
    async eth_requestAccounts(address) {
        return [address];
    }
    async eth_accounts(address) {
        return [address];
    }
    async signUserOp(message) {
        return this.wallet.signMessage({
            message: { raw: message },
            account: this.wallet.account
        });
    }
    async eth_sendTransaction(transaction) {
        return this.wallet.sendTransaction({
            ...transaction,
            account: this.wallet.account,
            chain: this.wallet.chain,
            kzg: undefined
        });
    }
    async eth_signTransaction(transaction) {
        return this.wallet.signTransaction({
            ...transaction,
            account: this.wallet.account,
            chain: this.wallet.chain,
            kzg: undefined
        });
    }
}
//# sourceMappingURL=key.wallet-provider.js.map