import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}

registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' });
