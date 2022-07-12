import { registerEnumType } from '@nestjs/graphql';

export enum FileRelationEnum {
  USER = 'user',
}

registerEnumType(FileRelationEnum, { name: 'FileRelationEnum' });
