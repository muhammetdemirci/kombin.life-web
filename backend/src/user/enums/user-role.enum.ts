import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ROOT = 'ROOT',
}

registerEnumType(UserRole, { name: 'UserRole' });
