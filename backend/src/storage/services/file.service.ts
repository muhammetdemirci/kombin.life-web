import { Injectable } from '@nestjs/common';

import { FileCreateDto } from '../dtos/file-create.dto';
import { FileUpdateDto } from '../dtos/file-update.dto';
import { FileRelationEnum } from '../enums/file-relation.enum';
import { FileStorageEnum } from '../enums/file-storage.enum';
import { FileTable } from '../tables/file.table';

@Injectable()
export class FileService {
  async getFiles(): Promise<FileTable[]> {
    const page = await FileTable.query().page(0, 1000);

    return page.results;
  }

  async getFilesByRelation(relation: FileRelationEnum): Promise<FileTable[]> {
    const page = await FileTable.query()
      .from(`${FileTable.tableName} as file`)
      .where('file.relation', relation)
      .page(0, 1000);
    return page.results;
  }

  async getFilesByRelationAndId(relation: FileRelationEnum, relationId: string): Promise<FileTable[]> {
    const page = await FileTable.query()
      .from(`${FileTable.tableName} as file`)
      .where('file.relation', relation)
      .andWhere('file.relationId', relationId)
      .page(0, 1000);

    return page.results;
  }

  async getFileById(id: string): Promise<FileTable | null> {
    const file = await FileTable.query().findById(id);

    return file;
  }

  async createFile(data: FileCreateDto): Promise<FileTable> {
    const file = new FileTable();
    file.relation = data.relation;
    file.relationId = data.relationId;
    file.status = data.status;

    file.storage = data.storage ?? FileStorageEnum.UNKNOWN;
    file.key = data.key;

    file.url = data.url;
    file.filename = data.filename;
    file.alias = data.alias;
    file.directory = data.directory;
    file.extension = data.extension;
    file.mimeType = data.mimeType;
    file.size = data.size;
    file.etag = data.etag;
    file.access = data.access;
    file.meta = data.meta;

    const createdFile = await FileTable.query().insertAndFetch(file);

    return createdFile;
  }

  async updateFile(id: string, data: FileUpdateDto): Promise<FileTable | null> {
    const file = await this.getFileById(id);

    if (!file) {
      return null;
    }

    file.relation = data.relation ?? file.relation;
    file.relationId = data.relationId ?? file.relationId;
    file.status = data.status ?? file.status;

    file.storage = data.storage ?? file.storage;
    file.key = data.key ?? file.key;

    file.url = data.url ?? file.url;
    file.filename = data.filename ?? file.filename;
    file.alias = data.alias ?? file.alias;
    file.directory = data.directory ?? file.directory;
    file.extension = data.extension ?? file.extension;
    file.mimeType = data.mimeType ?? file.mimeType;
    file.size = data.size ?? file.size;
    file.etag = data.etag ?? file.etag;
    file.access = data.access ?? file.access;
    file.meta = data.meta ?? file.meta;

    const createdFile = await FileTable.query().updateAndFetchById(file.id, file);

    return createdFile;
  }
}
