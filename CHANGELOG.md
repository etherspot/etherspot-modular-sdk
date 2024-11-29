# Changelog

## [3.0.0] - 2024-11-29
### Breaking Changes
- library migration for `ethers` to `viem` migration

## [2.0.8] - 2024-10-23
### Breaking Changes
- `signMessage` & `signTypedData` fn now adds validatorAddress on the resultant signature to make it work for deployed smart wallets

## [2.0.7] - 2024-10-23
### Breaking Changes
- `signMessage` fn now adds accountAddress on personal_sign methods

## [2.0.6] - 2024-10-14
### fix
- `getNonce` function to validate for the installed module check only for the existing modular wallet
- `getNonce` function to skip validation check on installed module for to be created modular wallet

## [2.0.5] - 2024-09-26
### fix
- validate the tokenAddress for `enableSessionKey` on `SessionKeyValidator` SDK instance
- validate the validatorAddress being set in tne `key` during `estimate` call on ModularSDK

## [2.0.4] - 2024-09-04
### Breaking Changes
- Static method `create` to initialize `SessionKeyValidator`
- Removed `getNonce` method from `SessionKeyValidator`

## [2.0.3] - 2024-08-23
### Breaking Changes
- Fix for `deleteSessionKey` API request failure

## [2.0.2] - 2024-08-21
### New
- Updated XDC Mainnet factory address

## [2.0.0] - 2024-08-16
### New
- Added support for XDC Mainnet

## [2.0.0] - 2024-08-08
### Breaking Changes
- Changed to a new wallet factory contract address

## [1.1.3] - 2024-07-24
### New
- Added `signUserOpWithSessionKey` function into SessionKeyValidator for sign the userOP using session key.
- Added `sessionData` function into SessionKeyValidator to fetch session Data of particular sessionKey.
### Breaking Changes
- Updated `enableSessionKey`, `rotateSessionKey` and `disableSessionKey` functions for the multiple session keys per apiKey and walletAddress.

## [1.1.2] - 2024-07-10
### New
- Added `SessionKeyValidator` module for ERC20 SessionKeyValidator.
- Added `enableSessionKey`, `rotateSessionKey`, `disableSessionKey`, and `getAssociatedSessionKeys` functions to `SessionKeyValidator`.

## [1.1.1] - 2024-07-08
### Feature Enhancement
- sdk function to prepare the `deinitData` for `uninstall` module
### New
- List all modules in etherspot-modular-wallet
- pagination based functions to fetch all modules by moduleType

## [1.1.0] - 2024-06-27
### Breaking Changes
- Removed `ArkaPaymaster` as it is no longer relevant to the epv07 paymasters on Arka

## [1.0.3] - 2024-06-24
### Bug Fixes
- Added support for paymaster executions according to EPv7

## [1.0.2] - 2024-06-17
### New
- Added support for XDC Testnet.

## [1.0.1] - 2024-06-13
### New
- The addresses of the contracts have been updated on all chains.
### Changes
- The `installModule` and `uninstallModule` functions have been enhanced to allow direct module installation and uninstallation from within the functions, providing a return of the UserOp Hash.
- The `DataUtils` module has been removed from the code.
- The code supporting ZeroDev and SimpleAccount has been removed.

## [1.0.0] - 2024-06-04
### New
- Added support for EP7.0 and Etherspot's Modular accounts
- Added `installModule` function to install module
- Added `uninstallModule` function to remove module
