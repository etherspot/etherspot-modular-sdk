// src/sdk/common/abis.ts
var erc20Abi = [
  "function approve(address spender, uint256 value) returns (bool)",
  "function decimals() view returns (uint8)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() returns (uint256)",
  "function balanceOf(address account) returns (uint256)",
  "function allowance(address owner, address spender) returns (uint256)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)"
];
var erc721Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function approve(address to, uint256 tokenId)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function setApprovalForAll(address operator, bool approved)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data)"
];
var factoryAbi = [
  "function createAccount(bytes32 salt,bytes calldata initCode) returns (address)",
  "function getAddress(bytes32 salt,bytes calldata initcode) view returns (address)"
];
var bootstrapAbi = [
  "function singleInitMSA(address validator, bytes calldata data)",
  "function initMSA(BootstrapConfig[] calldata $valdiators,BootstrapConfig[] calldata $executors,BootstrapConfig calldata _hook,BootstrapConfig[] calldata _fallbacks)",
  "struct BootstrapConfig {address module;bytes data;}"
];
var modulesAbi = [
  "function onInstall(bytes data)"
];
var entryPointAbi = [
  "function getSenderAddress(bytes initCode) view returns (address)",
  "function balanceOf(address account) view returns (uint256)",
  "function getNonce(address sender, uint192 key) view returns (uint256)",
  "function getDepositInfo(address account) view returns (uint256,bool,uint112,uint32,uint48)",
  "event UserOperationEvent(bytes32 indexed userOpHash,address indexed sender,address indexed paymaster,uint256 nonce,bool success,uint256 actualGasCost,uint256 actualGasUsed)"
];
var accountAbi = [
  "function execute(bytes32 mode,bytes executionCalldata)",
  "function getActiveHook() external view returns (address hook)",
  "function getValidatorPaginated(address cursor,uint256 size) returns (address[] memory, address)",
  "function getExecutorsPaginated(address cursor,uint256 size) returns (address[] memory, address)",
  "function installModule(uint256 moduleTypeId,address module,bytes calldata initData)",
  "function uninstallModule(uint256 moduleTypeId,address module,bytes calldata deInitData)",
  "function isModuleInstalled(uint256 moduleTypeId,address module,bytes calldata additionalContext) returns (bool)",
  "function isOwner(address _address) returns (bool)"
];
var sessionKeyValidatorAbi = [
  "function enableSessionKey(bytes calldata _sessionData)",
  "function disableSessionKey(address _session)",
  "function rotateSessionKey(address _oldSessionKey,bytes calldata _newSessionData)",
  "function getAssociatedSessionKeys() returns (address[] memory keys)",
  "function sessionData(address _sessionKey, address _account) returns (address token,bytes4 funcSelector,uint256 spendingLimit,uint48 validAfter,uint48 validUntil,bool live)"
];

export {
  erc20Abi,
  erc721Abi,
  factoryAbi,
  bootstrapAbi,
  modulesAbi,
  entryPointAbi,
  accountAbi,
  sessionKeyValidatorAbi
};
//# sourceMappingURL=chunk-ZJ2O6KOQ.js.map