# Changelog
## [6.0.0] - 2025-05-22
### Breaking Changes
- Changed contract address for Wallet Factory from `0x2A40091f044e48DEB5C0FCbc442E443F3341B451` to `0x38CC0EDdD3a944CA17981e0A19470d2298B8d43a`
- Changed contract address for Bootstrap from `0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA` to `0xCF2808eA7d131d96E5C73Eb0eCD8Dc84D33905C7`
- Changed contract address for Multiple Owner ECDSA Validator from `0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906` to `0x0eA25BF9F313344d422B513e1af679484338518E`
- Results in a change of precomputed modular account address.

## [5.1.2] - 2025-05-07
### Fix
- Added ability to use custom chain

## [5.1.1] - 2025-03-19
### Fix
- Removed multiple estimations when paymaster is set in the userOp

## [5.1.0] - 2025-03-06
### Updated
- Updated the RxJS library to 7.8.2 from 6.6.7. All imports within the code have been updated. Bumped minor due to the major version revision of RxJS this adds functionality to the SDk and is backwards compatible.

## [5.0.1] - 2025-02-26
### Fix
- Fixed build issues faced on React by changing build command to bun
- Added types build folder separately

## [5.0.0] - 2025-01-07
### Breaking Changes
- Changed contract address for Bootstrap to `0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA`
- Changed contract address for Wallet Factory to `0x2A40091f044e48DEB5C0FCbc442E443F3341B451`
- Changed contract address for Multiple Owner ECDSA Validator to `0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906`
- Results in a change of precomputed modular account address.

## [4.0.1] - 2024-12-16
### fix
-`signMessage` on walletconnect now verifies as valid on react walletConnect testing app

## [4.0.0] - 2024-12-12
### Breaking Changes
- Changed the validator address from `0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143` to `0x7aCEE15c9FFc1e8f287C26E0f4C8244A0729F557` which will change the default account address got from getCounterfactualAddress fn. Please use earlier version for fund recovery
### fix
- `signMessage` and `signTypedData` returned signature now verifies with the etherspot undeployed smart wallet account
- Resolved build issues found on React apps

## [3.0.1] - 2024-12-03
### fix
- `signMessage` and `signTypedData` returned signature now verifies with the etherspot smart wallet account

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
