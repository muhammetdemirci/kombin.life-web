import { registerEnumType } from '@nestjs/graphql';

export enum FileStorageEnum {
  UNKNOWN = 'unknown',
  LOCAL = 'local',
  AMAZON_S3 = 'amazon_s3',
  CLOUDINARY = 'cloudinary',
}

registerEnumType(FileStorageEnum, { name: 'FileStorageEnum' });
