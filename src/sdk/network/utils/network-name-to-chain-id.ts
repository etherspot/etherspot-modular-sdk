import { NetworkNames, NETWORK_NAME_TO_CHAIN_ID } from '../constants.js';

export function networkNameToChainId(networkName: NetworkNames): number {
  return NETWORK_NAME_TO_CHAIN_ID[networkName] || null;
}

export { NETWORK_NAME_TO_CHAIN_ID };
