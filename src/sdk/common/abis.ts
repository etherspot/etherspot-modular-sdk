export const factoryAbi = [
    'function createAccount(bytes32 salt,bytes calldata initCode) returns (address)',
    'function getAddress(bytes32 salt,bytes calldata initcode) view returns (address)'
  ]
  
  export const bootstrapAbi = [
    'function singleInitMSA(address validator, bytes calldata data)',
    'function initMSA(BootstrapConfig[] calldata $valdiators,BootstrapConfig[] calldata $executors,BootstrapConfig calldata _hook,BootstrapConfig[] calldata _fallbacks)',
    'struct BootstrapConfig {address module;bytes data;}',
  ]

  export const modulesAbi = [
    'function onInstall(bytes data)'
  ];

  export const entryPointAbi = [
    'function getSenderAddress(bytes initCode) view returns (address)',
    'function balanceOf(address account) view returns (uint256)',
    'function getNonce(address sender, uint192 key) view returns (uint256)',
    'function getDepositInfo(address account) view returns (uint256,bool,uint112,uint32,uint48)',
    'event UserOperationEvent(bytes32 indexed userOpHash,address indexed sender,address indexed paymaster,uint256 nonce,bool success,uint256 actualGasCost,uint256 actualGasUsed)'
  ];
  

  export const accountAbi = [
    'function execute(bytes32 mode,bytes executionCalldata)',
    'function getActiveHook() external view returns (address hook)',
    'function getValidatorPaginated(address cursor,uint256 size) returns (address[] memory, address)',
    'function getExecutorsPaginated(address cursor,uint256 size) returns (address[] memory, address)',
    'function installModule(uint256 moduleTypeId,address module,bytes calldata initData)',
    'function uninstallModule(uint256 moduleTypeId,address module,bytes calldata deInitData)',
    'function isModuleInstalled(uint256 moduleTypeId,address module,bytes calldata additionalContext) returns (bool)',
    'function isOwner(address _address) returns (bool)'
  ];

  export const sessionKeyValidatorAbi = [
    'function enableSessionKey(bytes calldata _sessionData)',
    'function disableSessionKey(address _session)',
    'function rotateSessionKey(address _oldSessionKey,bytes calldata _newSessionData)',
    'function getAssociatedSessionKeys() returns (address[] memory keys)'
  ];
  