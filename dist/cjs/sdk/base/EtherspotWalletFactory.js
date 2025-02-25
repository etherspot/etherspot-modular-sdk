"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherspotWalletFactoryAPI = void 0;
const viem_1 = require("viem");
class EtherspotWalletFactoryAPI {
    static createAccount(factoryAddress, registry, owner, salt) {
        const abi = ['function createAccount(address, _registry, address owner, uint256 salt) returns(address)'];
        const encodedData = (0, viem_1.encodeFunctionData)({
            functionName: 'createAccount',
            abi: (0, viem_1.parseAbi)(abi),
            args: [registry,
                owner,
                salt,],
        });
        return encodedData;
    }
}
exports.EtherspotWalletFactoryAPI = EtherspotWalletFactoryAPI;
//# sourceMappingURL=EtherspotWalletFactory.js.map