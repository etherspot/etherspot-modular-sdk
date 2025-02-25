import { P as PaymasterAPI } from '../../PaymasterAPI-CbUneXjr.cjs';
import '../types/user-operation-types.cjs';
import '../common/types.cjs';
import 'viem';
import '../types/bignumber.cjs';
import '../common/ERC4337Utils.cjs';

interface ClientConfig {
    entryPointAddress: string;
    registryAddress: string;
    bundlerUrl: string;
    walletAddres?: string;
    paymasterAPI?: PaymasterAPI;
}

export type { ClientConfig };
