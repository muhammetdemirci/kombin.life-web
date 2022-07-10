import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}

registerEnumType(UserRole, { name: 'UserRole' });
