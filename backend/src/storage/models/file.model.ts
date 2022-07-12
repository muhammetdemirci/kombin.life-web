import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { FileAccessEnum } from '../enums/file-access.enum';
import { FileRelationEnum } from '../enums/file-relation.enum';
import { FileStatusEnum } from '../enums/file-status.enum';
import { FileStorageEnum } from '../enums/file-storage.enum';

@ObjectType()
export class FileModel {
  @Field(() => ID)
  id!: string;

  @Field(() => FileRelationEnum)
  relation!: FileRelationEnum;

  @Field(() => ID)
  relationId!: string;

  @Field(() => FileStatusEnum)
  status!: FileStatusEnum;

  @Field(() => FileStorageEnum)
  storage!: FileStorageEnum;

  @Field(() => String, { nullable: true })
  key?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  mimeType?: string;

  @Field(() => Int, { nullable: true })
  size?: number;

  @Field(() => String, { nullable: true })
  directory?: string;

  @Field(() => String, { nullable: true })
  filename?: string;

  @Field(() => String, { nullable: true })
  alias?: string;

  @Field(() => String, { nullable: true })
  extension?: string;

  @Field(() => String, { nullable: true })
  etag?: string;

  @Field(() => String, { nullable: true })
  access?: FileAccessEnum;

  @Field(() => String, { nullable: true })
  meta?: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
