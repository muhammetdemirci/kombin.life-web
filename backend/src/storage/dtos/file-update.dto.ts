import { FileAccessEnum } from '../enums/file-access.enum';
import { FileRelationEnum } from '../enums/file-relation.enum';
import { FileStatusEnum } from '../enums/file-status.enum';
import { FileStorageEnum } from '../enums/file-storage.enum';

export class FileUpdateDto {
  relation?: FileRelationEnum;
  relationId?: string;
  status?: FileStatusEnum;

  storage?: FileStorageEnum;
  key?: string;

  url?: string;
  filename?: string;
  alias?: string;
  extension?: string;
  directory?: string;
  mimeType?: string;
  etag?: string;
  access?: FileAccessEnum;
  size?: number;
  meta?: string;
}
