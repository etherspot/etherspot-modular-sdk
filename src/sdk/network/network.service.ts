import { Observable } from 'rxjs';
import { NetworkConfig } from './index.js';
import { ObjectSubject, Service, Exception } from '../common/index.js';
import { Networks, CHAIN_ID_TO_NETWORK_NAME, SupportedNetworks, NetworkNames } from './constants.js';
import { Network } from './interfaces.js';

export class NetworkService extends Service {
  readonly network$ = new ObjectSubject<Network>(null);
  readonly chainId$: Observable<number>;
  readonly defaultNetwork: Network;
  readonly supportedNetworks: Network[];
  readonly externalContractAddresses = new Map<string, { [key: number]: string }>();

  constructor(defaultChainId?: number) {
    super();
    this.supportedNetworks = SupportedNetworks
      .map((chainId) => {
        const name = CHAIN_ID_TO_NETWORK_NAME[chainId];
        return !name
          ? null
          : {
              chainId,
              name,
            };
      })
      .filter((value) => !!value);

    if (!this.supportedNetworks.length) {
      throw new Exception('Invalid network config');
    }

    this.defaultNetwork = defaultChainId
      ? this.supportedNetworks.find(({ chainId }) => chainId === defaultChainId)
      : this.supportedNetworks[0];

    if (!this.defaultNetwork) {
      this.defaultNetwork = this.supportedNetworks.find(({ chainId }) => chainId === 1)
    }

    this.chainId$ = this.network$.observeKey('chainId');
  }

  get network(): Network {
    return this.network$.value;
  }

  get chainId(): number {
    return this.network ? this.network.chainId : null;
  }

  useDefaultNetwork(): void {
    this.network$.next(this.defaultNetwork);
  }

  switchNetwork(networkName: NetworkNames): void {
    this.network$.next(this.supportedNetworks.find(({ name }) => name === networkName) || null);
  }

  isNetworkSupported(chainId: number): boolean {
    return SupportedNetworks.includes(chainId);
  }

  getNetworkConfig(chainId: number): NetworkConfig {
    const networkConfig = Networks[chainId];
    if (!networkConfig) {
      throw new Error(`No network config found for network '${chainId}'`);
    }
    return networkConfig;
  }
}
