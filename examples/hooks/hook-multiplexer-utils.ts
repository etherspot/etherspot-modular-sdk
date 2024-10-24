import { ethers } from "ethers";
import * as HookMultiPlexerABI from "../../src/sdk/abi/HookMultiPlexer.json";

// Define the SigHookInit type
interface SigHookInit {
    sig: string;
    subHooks: string[];
}

// Define the function to get the hook multiplexer init data
export async function getHookMultiPlexerInitDataWithCredibleAccountModule(credibleAccountModuleAddress: string): Promise<string> {
    // Create the arrays
    const globalHooks: string[] = [credibleAccountModuleAddress];
    const valueHooks: string[] = [];
    const delegatecallHooks: string[] = [];
    const sigHooks: SigHookInit[] = [];
    const targetSigHooks: SigHookInit[] = [];

    // Encode the data using Ethers.js
    const encodedData = ethers.utils.defaultAbiCoder.encode(
        [
            "address[]",
            "address[]",
            "address[]",
            "tuple(bytes4 sig, address[] subHooks)[]",
            "tuple(bytes4 sig, address[] subHooks)[]"
        ],
        [
            globalHooks,
            valueHooks,
            delegatecallHooks,
            sigHooks,
            targetSigHooks
        ]
    );

    console.log("Encoded Data:", encodedData);

    const iface = new ethers.utils.Interface(HookMultiPlexerABI.abi);
    const hookMultiplexerInitData = iface.encodeFunctionData('onInstall', [encodedData]);

    console.log("Hook Multiplexer Init Data:", hookMultiplexerInitData);

    return hookMultiplexerInitData;
}

// npx ts-node examples/hook-multiplexer.ts
// (async () => {
//     const credibleAccountModuleAddress = "0x36973ffC8E14c9301D334Ea6Fe0A95Ead0Ea22ed";
//     const encodedData = await getHookMultiPlexerInitDataWithCredibleAccountModule(credibleAccountModuleAddress);
//     console.log("Encoded Data:", encodedData);
// })();