import { ValidationOptions } from 'class-validator';
import { IsHex } from './is-hex.validator.js';

export function IsHex32(options: ValidationOptions = {}) {
  return IsHex(
    {
      size: 32,
    },
    options,
  );
}
