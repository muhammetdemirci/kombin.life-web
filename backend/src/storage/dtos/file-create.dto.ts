import { FileAccessEnum } from '../enums/file-access.enum';
import { FileRelationEnum } from '../enums/file-relation.enum';
import { FileStatusEnum } from '../enums/file-status.enum';
import { FileStorageEnum } from '../enums/file-storage.enum';

export class FileCreateDto {
  relation!: FileRelationEnum;
  relationId!: string;
  status: FileStatusEnum = FileStatusEnum.PENDING;

  storage?: FileStorageEnum = FileStorageEnum.UNKNOWN;
  key?: string;

  url?: string;
  filename?: string;
  alias?: string;
  extension?: string;
  directory?: string;
  mimeType?: string;
  etag?: string;
  access?: FileAccessEnum = FileAccessEnum.PUBLIC;
  size?: number;
  meta?: string;
}
