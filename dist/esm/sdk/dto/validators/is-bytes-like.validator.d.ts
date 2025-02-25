import { ValidationOptions } from 'class-validator';

declare function IsBytesLike(options?: ValidationOptions & {
    acceptText?: boolean;
}): (object: any, propertyName: string) => void;

export { IsBytesLike };
