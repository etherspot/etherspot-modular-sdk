import { Address } from 'viem';
/**
 * @ignore
 */
export declare enum HeaderNames {
    AuthToken = "x-auth-token",
    AnalyticsToken = "x-analytics-token",
    ProjectMetadata = "x-project-metadata"
}
export declare const bufferPercent = 13;
export declare const onRampApiKey = "pk_prod_01H66WYDRFM95JBTJ4VMGY1FAX";
export declare const AddressZero = "0x0000000000000000000000000000000000000000";
export declare enum CALL_TYPE {
    SINGLE = "0x00",
    BATCH = "0x01",
    STATIC = "0xFE",
    DELEGATE_CALL = "0xFF"
}
export declare enum EXEC_TYPE {
    DEFAULT = "0x00",
    TRY_EXEC = "0x01"
}
export declare enum MODULE_TYPE {
    VALIDATOR = "0x01",
    EXECUTOR = "0x02",
    FALLBACK = "0x03",
    HOOK = "0x04"
}
export declare const VIEM_SENTINEL_ADDRESS: Address;
//# sourceMappingURL=constants.d.ts.map