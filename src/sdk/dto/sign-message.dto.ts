import { type BytesLike } from '../common/types.js';
import { IsBytesLike } from './validators/index.js';

export class SignMessageDto {
  @IsBytesLike({
    acceptText: true,
  })
  message: BytesLike;
}
