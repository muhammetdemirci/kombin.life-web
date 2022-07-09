import { registerEnumType } from '@nestjs/graphql';

export enum Locale {
  ENGLISH = 'en',
  TURKISH = 'tr',
}

registerEnumType(Locale, { name: 'Locale' });
