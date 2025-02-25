import { P as PaymasterAPI } from '../../PaymasterAPI-Dj36ihyu.js';
import '../types/user-operation-types.js';
import '../common/types.js';
import 'viem';
import '../types/bignumber.js';
import '../common/ERC4337Utils.js';

interface ClientConfig {
    entryPointAddress: string;
    registryAddress: string;
    bundlerUrl: string;
    walletAddres?: string;
    paymasterAPI?: PaymasterAPI;
}

export type { ClientConfig };
