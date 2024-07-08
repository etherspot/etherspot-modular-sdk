# Changelog
## [1.1.1] - 2024-07-08
### New
- Added `SessionKeyValidator` module for ERC20 SessionKeyValidator.
- Added `enableSessionKey`, `rotateSessionKey`, `disableSessionKey`, and `getAssociatedSessionKeys` functions to `SessionKeyValidator`.

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
