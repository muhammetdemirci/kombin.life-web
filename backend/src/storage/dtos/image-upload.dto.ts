import { FileUpload } from 'graphql-upload';

import { FileRelationEnum } from '../enums/file-relation.enum';
import { FileTable } from '../tables/file.table';

export class ImageUploadDto {
  file?: FileTable;
  relation!: FileRelationEnum;
  relationId!: string;

  upload!: FileUpload;
  path!: string;
}
