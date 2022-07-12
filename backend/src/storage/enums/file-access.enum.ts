import { registerEnumType } from '@nestjs/graphql';

export enum FileAccessEnum {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

registerEnumType(FileAccessEnum, { name: 'FileAccessEnum' });
