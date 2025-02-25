"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyWalletProvider = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const index_js_1 = require("../../network/index.js");
class KeyWalletProvider {
    constructor(chainId, privateKey) {
        this.type = 'Key';
        this.wallet = (0, viem_1.createWalletClient)({
            account: (0, accounts_1.privateKeyToAccount)(privateKey),
            chain: index_js_1.Networks[chainId].chain,
            transport: (0, viem_1.http)()
        });
        const { address } = this.wallet.account;
        this.address = address;
    }
    async signMessage(message, validatorAddress, factoryAddress, initCode) {
        const signature = await this.wallet.signMessage({
            message: { raw: (0, viem_1.toBytes)((0, viem_1.hashMessage)({ raw: (0, viem_1.toBytes)(message) })) },
            account: this.wallet.account
        });
        if (initCode !== '0x') {
            const abiCoderResult = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('address, bytes, bytes'), [factoryAddress, initCode, (0, viem_1.concat)([validatorAddress, signature])]);
            return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492';
        }
        return (0, viem_1.concat)([
            validatorAddress,
            signature
        ]);
    }
    async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
        const signature = await this.wallet.signTypedData({
            domain: msg.domain,
            types: msg.types,
            primaryType: msg.primaryType,
            message: msg.message,
            account: this.wallet.account
        });
        if (initCode !== '0x') {
            const abiCoderResult = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('address, bytes, bytes'), [factoryAddress, initCode, (0, viem_1.concat)([validatorAddress, signature])]);
            return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492';
        }
        return (0, viem_1.concat)([
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
exports.KeyWalletProvider = KeyWalletProvider;
//# sourceMappingURL=key.wallet-provider.js.map