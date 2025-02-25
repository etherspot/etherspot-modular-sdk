"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaMaskWalletProvider = void 0;
const dynamic_wallet_provider_js_1 = require("./dynamic.wallet-provider.js");
const viem_1 = require("viem");
class MetaMaskWalletProvider extends dynamic_wallet_provider_js_1.DynamicWalletProvider {
    static get ethereum() {
        return this.detect() ? window.ethereum : null;
    }
    static detect() {
        return !!window?.ethereum?.isMetaMask;
    }
    static async connect() {
        if (!this.instance) {
            if (!this.detect()) {
                throw new Error('MetaMask not found');
            }
            this.instance = new MetaMaskWalletProvider();
            await this.instance.connect();
        }
        if (!this.instance.address) {
            throw new Error('Can not connect to MetaMask');
        }
        return this.instance;
    }
    constructor() {
        super('MetaMask');
    }
    async signMessage(message, validatorAddress, factoryAddress, initCode) {
        const msg = (0, viem_1.toBytes)((0, viem_1.hashMessage)({ raw: (0, viem_1.toBytes)(message) }));
        const signature = await this.sendRequest('personal_sign', [
            msg,
            this.address,
        ]);
        if (initCode !== '0x') {
            const abiCoderResult = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('address, bytes, bytes'), [factoryAddress, initCode, (0, viem_1.concat)([validatorAddress, signature])]);
            return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492';
        }
        return validatorAddress + signature.slice(2);
    }
    async signUserOp(message) {
        return this.sendRequest('personal_sign', [
            (0, viem_1.toHex)(message),
            this.address
        ]);
    }
    async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
        const signature = await this.sendRequest('eth_signTypedData_v4', [
            this.address,
            msg
        ]);
        if (initCode !== '0x') {
            const abiCoderResult = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('address, bytes, bytes'), [factoryAddress, initCode, (0, viem_1.concat)([validatorAddress, signature])]);
            return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492';
        }
        return validatorAddress + signature.slice(2);
    }
    async eth_requestAccounts(address) {
        return [address];
    }
    async eth_accounts(address) {
        return [address];
    }
    async eth_sendTransaction(transaction) {
        return this.sendRequest('eth_sendTransaction', [
            transaction
        ]);
    }
    async eth_signTransaction(transaction) {
        return this.sendRequest('eth_signTransaction', [
            transaction
        ]);
    }
    async connect() {
        const { ethereum } = window;
        ethereum.autoRefreshOnNetworkChange = false;
        ethereum.on('accountsChanged', ([address]) => this.setAddress(address));
        ethereum.on('chainChanged', () => {
            window.location.reload();
        });
        try {
            const chainId = await this.sendRequest('eth_chainId');
            this.setNetworkName(chainId);
            const [address] = await this.sendRequest('eth_requestAccounts');
            this.setAddress(address);
        }
        catch (err) {
        }
    }
    async sendRequest(method, params) {
        const { ethereum } = window;
        return ethereum.request({
            method,
            params,
        });
    }
}
exports.MetaMaskWalletProvider = MetaMaskWalletProvider;
//# sourceMappingURL=meta-mask.wallet-provider.js.map