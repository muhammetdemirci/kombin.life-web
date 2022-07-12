import { Model, RelationMappings } from 'objection';
import { UserTable } from 'src/user/tables/user.table';

import { FileAccessEnum } from '../enums/file-access.enum';
import { FileRelationEnum } from '../enums/file-relation.enum';
import { FileStatusEnum } from '../enums/file-status.enum';
import { FileStorageEnum } from '../enums/file-storage.enum';

export class FileTable extends Model {
  static tableName = 'files';
  static idColumn = 'id';

  id!: string;
  relation!: FileRelationEnum;
  relationId!: string;

  storage!: FileStorageEnum;
  status!: FileStatusEnum;
  /**
   * @description
   * the key field depends on storage type
   * the local is undefined
   * the amazon s3 is the amazon key
   * the cloudinary is the public id
   * @type {string}
   */
  key?: string;
  mimeType?: string;
  size?: number;
  directory?: string;
  filename?: string;
  alias?: string;
  url?: string;
  extension?: string;
  etag?: string;
  access?: FileAccessEnum;
  meta?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  static relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserTable,
        join: {
          from: 'files.relationId',
          to: 'user.id',
        },
      },
    };
  }

  user?: UserTable;
}
