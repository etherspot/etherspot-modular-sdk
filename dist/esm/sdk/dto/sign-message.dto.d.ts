import { BytesLike } from '../common/types.js';
import 'viem';

declare class SignMessageDto {
    message: BytesLike;
}

export { SignMessageDto };
