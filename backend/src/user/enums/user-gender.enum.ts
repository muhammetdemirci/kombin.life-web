import { registerEnumType } from '@nestjs/graphql';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  DIVERSE = 'diverse',
}

registerEnumType(UserGender, { name: 'UserGender' });
