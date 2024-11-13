import { BytesLike } from '../common/types';
import { IsBytesLike } from './validators';

export class SignMessageDto {
  @IsBytesLike({
    acceptText: true,
  })
  message: BytesLike;
}
