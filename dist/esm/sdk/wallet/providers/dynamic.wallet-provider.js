import { prepareNetworkName } from '../../network/index.js';
import { prepareAddress, UniqueSubject } from '../../common/index.js';
export class DynamicWalletProvider {
    constructor(type) {
        this.type = type;
        this.address$ = new UniqueSubject();
        this.networkName$ = new UniqueSubject();
        //
    }
    get address() {
        return this.address$.value;
    }
    get networkName() {
        return this.networkName$.value;
    }
    setAddress(address) {
        this.address$.next(prepareAddress(address));
    }
    setNetworkName(networkNameOrChainId) {
        this.networkName$.next(prepareNetworkName(networkNameOrChainId));
    }
}
//# sourceMappingURL=dynamic.wallet-provider.js.map