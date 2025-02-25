"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecuteMode = exports.resolveProperties = void 0;
const viem_1 = require("viem");
const resolveProperties = async (object) => {
    const promises = Object.keys(object).map((key) => {
        const value = object[key];
        return Promise.resolve(value).then((v) => ({ key: key, value: v }));
    });
    const results = await Promise.all(promises);
    return results.reduce((accum, result) => {
        accum[(result.key)] = result.value;
        return accum;
    }, {});
};
exports.resolveProperties = resolveProperties;
const getExecuteMode = ({ callType, execType }) => {
    return (0, viem_1.concat)([
        callType,
        execType,
        "0x00000000",
        "0x00000000",
        (0, viem_1.pad)("0x00000000", { size: 22 })
    ]);
};
exports.getExecuteMode = getExecuteMode;
//# sourceMappingURL=userop-utils.js.map