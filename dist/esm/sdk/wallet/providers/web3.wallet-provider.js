import { prepareAddress } from '../../common/index.js';
import { prepareNetworkName } from '../../network/index.js';
import { DynamicWalletProvider } from './dynamic.wallet-provider.js';
import { concat, encodeAbiParameters, hashMessage, parseAbiParameters, toBytes, toHex } from 'viem';
export class Web3WalletProvider extends DynamicWalletProvider {
    static async connect(provider, type = 'Web3') {
        const result = new Web3WalletProvider(provider, type);
        const connected = await result.refresh();
        return connected ? result : null;
    }
    constructor(web3, type = 'Web3') {
        super(type);
        this.web3 = web3;
    }
    get address() {
        return this.address$.value;
    }
    get networkName() {
        return this.networkName$.value;
    }
    async refresh() {
        let result = false;
        const chainId = await this.sendRequest('eth_chainId');
        const networkName = prepareNetworkName(chainId);
        if (networkName) {
            const accounts = await this.sendRequest('eth_accounts');
            if (Array.isArray(accounts) && accounts.length) {
                const address = prepareAddress(accounts[0]);
                if (address) {
                    this.setAddress(address);
                    this.setNetworkName(networkName);
                    result = true;
                }
            }
        }
        return result;
    }
    async signMessage(message, validatorAddress, factoryAddress, initCode) {
        const msg = toBytes(hashMessage({ raw: toBytes(message) }));
        const signature = await this.sendRequest('personal_sign', [
            msg,
            this.address, //
        ], this.address);
        if (initCode !== '0x') {
            const abiCoderResult = encodeAbiParameters(parseAbiParameters('address, bytes, bytes'), [factoryAddress, initCode, concat([validatorAddress, signature])]);
            return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492'; //magicBytes
        }
        return validatorAddress + signature.slice(2);
    }
    async signUserOp(message) {
        return this.sendRequest('personal_sign', [
            toHex(message),
            this.address, //
        ], this.address);
    }
    async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
        const signature = await this.sendRequest('eth_signTypedData', [
            this.address,
            msg
        ]);
        if (initCode !== '0x') {
            const abiCoderResult = encodeAbiParameters(parseAbiParameters('address, bytes, bytes'), [factoryAddress, initCode, concat([validatorAddress, signature])]);
            return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492'; //magicBytes
        }
        return validatorAddress + signature.slice(2);
    }
    async eth_requestAccounts() {
        return [this.address];
    }
    async eth_accounts() {
        return [this.address];
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
    async sendRequest(method, params = [], from) {
        return new Promise((resolve, reject) => {
            const id = Date.now();
            this.web3.send({
                jsonrpc: '2.0',
                method,
                params,
                id,
                from,
            }, (err, response) => {
                if (err) {
                    reject(err);
                    return;
                }
                let result;
                try {
                    ({ result } = response);
                }
                catch (err) {
                    result = null;
                }
                resolve(result || null);
            });
        });
    }
}
//# sourceMappingURL=web3.wallet-provider.js.map