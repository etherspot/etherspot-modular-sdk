interface BootstrapConfig {
    module: string;
    data: string;
}
declare function _makeBootstrapConfig(module: string, data: string): BootstrapConfig;
declare function makeBootstrapConfig(module: string, data: string): BootstrapConfig[];

export { type BootstrapConfig, _makeBootstrapConfig, makeBootstrapConfig };
