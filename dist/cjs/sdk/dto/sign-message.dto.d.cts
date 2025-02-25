import { BytesLike } from '../common/types.cjs';
import 'viem';

declare class SignMessageDto {
    message: BytesLike;
}

export { SignMessageDto };
