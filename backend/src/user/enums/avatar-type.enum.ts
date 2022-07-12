import { registerEnumType } from '@nestjs/graphql';

export enum AvatarTypeEnum {
  UNKNOWN = 'unknown',
  FILE = 'file',
  URL = 'url',
}

registerEnumType(AvatarTypeEnum, { name: 'AvatarTypeEnum' });
