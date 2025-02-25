import { Address } from 'viem';

declare enum HeaderNames {
    AuthToken = "x-auth-token",
    AnalyticsToken = "x-analytics-token",
    ProjectMetadata = "x-project-metadata"
}
declare const bufferPercent = 13;
declare const onRampApiKey = "pk_prod_01H66WYDRFM95JBTJ4VMGY1FAX";
declare const AddressZero = "0x0000000000000000000000000000000000000000";
declare enum CALL_TYPE {
    SINGLE = "0x00",
    BATCH = "0x01",
    STATIC = "0xFE",
    DELEGATE_CALL = "0xFF"
}
declare enum EXEC_TYPE {
    DEFAULT = "0x00",
    TRY_EXEC = "0x01"
}
declare enum MODULE_TYPE {
    VALIDATOR = "0x01",
    EXECUTOR = "0x02",
    FALLBACK = "0x03",
    HOOK = "0x04"
}
declare const VIEM_SENTINEL_ADDRESS: Address;

export { AddressZero, CALL_TYPE, EXEC_TYPE, HeaderNames, MODULE_TYPE, VIEM_SENTINEL_ADDRESS, bufferPercent, onRampApiKey };
