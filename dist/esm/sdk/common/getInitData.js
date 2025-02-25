import { decodeAbiParameters, decodeFunctionData, parseAbi, slice, } from 'viem';
import { bootstrapAbi, factoryAbi } from './abis.js';
export const getInitData = ({ initCode, }) => {
    const { args: initCodeArgs } = decodeFunctionData({
        abi: parseAbi(factoryAbi),
        data: slice(initCode, 20),
    });
    if (initCodeArgs?.length !== 2) {
        throw new Error('Invalid init code');
    }
    const initCallData = decodeAbiParameters([
        { name: 'bootstrap', type: 'address' },
        { name: 'initCallData', type: 'bytes' },
    ], initCodeArgs[1]);
    const { args: initCallDataArgs } = decodeFunctionData({
        abi: parseAbi(bootstrapAbi),
        data: initCallData[1],
    });
    if (initCallDataArgs?.length !== 4) {
        throw new Error('Invalid init code');
    }
    return {
        validators: initCallDataArgs[0],
        executors: initCallDataArgs[1],
        hooks: [initCallDataArgs[2]],
        fallbacks: initCallDataArgs[3],
    };
};
//# sourceMappingURL=getInitData.js.map