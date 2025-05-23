import { PaymasterAPI } from './PaymasterAPI.js';

/**
 * configuration params for wrapProvider
 */
export interface ClientConfig {
  /**
   * the entry point to use
   */
  entryPointAddress: string;
  /**
   * the personal account registry to use
   */
  registryAddress: string;
  /**
   * url to the bundler
   */
  bundlerUrl: string;
  /**
   * if set, use this pre-deployed wallet.
   * (if not set, use getSigner().getAddress() to query the "counterfactual" address of wallet.
   *  you may need to fund this address so the wallet can pay for its own creation)
   */
  walletAddres?: string;
  /**
   * if set, call just before signing.
   */
  paymasterAPI?: PaymasterAPI;
}
