import { registerEnumType } from '@nestjs/graphql';

export enum FileStatusEnum {
  UNKNOWN = 'unknown',
  EMPTY = 'empty',
  PENDING = 'pending',
  UPLOADING = 'uploading',
  DONE = 'done',
  ERROR = 'error',
}

registerEnumType(FileStatusEnum, { name: 'FileStatusEnum' });
