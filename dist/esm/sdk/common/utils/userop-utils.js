import { concat, pad } from "viem";
export const resolveProperties = async (object) => {
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
export const getExecuteMode = ({ callType, execType }) => {
    return concat([
        callType, // 1 byte
        execType, // 1 byte
        "0x00000000", // 4 bytes
        "0x00000000", // 4 bytes
        pad("0x00000000", { size: 22 })
    ]);
};
//# sourceMappingURL=userop-utils.js.map