import { IsHex } from './is-hex.validator.js';
export function IsHex32(options = {}) {
    return IsHex({
        size: 32,
    }, options);
}
//# sourceMappingURL=is-hex32.validator.js.map