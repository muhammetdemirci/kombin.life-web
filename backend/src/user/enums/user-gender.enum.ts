import { registerEnumType } from '@nestjs/graphql';

export enum UserGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  DIVERSE = 'diverse',
}

registerEnumType(UserGenderEnum, { name: 'UserGenderEnum' });
