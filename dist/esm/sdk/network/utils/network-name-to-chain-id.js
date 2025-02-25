import { NETWORK_NAME_TO_CHAIN_ID } from '../constants.js';
export function networkNameToChainId(networkName) {
    return NETWORK_NAME_TO_CHAIN_ID[networkName] || null;
}
export { NETWORK_NAME_TO_CHAIN_ID };
//# sourceMappingURL=network-name-to-chain-id.js.map