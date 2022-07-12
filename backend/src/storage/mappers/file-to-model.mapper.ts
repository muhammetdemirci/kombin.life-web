import { FileModel } from '../models/file.model';
import { FileTable } from '../tables/file.table';

export const mapFileToModel = (file: FileTable): FileModel => {
  const model = new FileModel();
  model.id = file.id;
  model.relation = file.relation;
  model.relationId = file.relationId;
  model.url = file.url;
  model.status = file.status;
  model.mimeType = file.mimeType;
  model.filename = file.filename;
  model.alias = file.alias;
  model.directory = file.directory;
  model.extension = file.extension;
  model.storage = file.storage;
  model.access = file.access;
  model.meta = file.meta;
  model.etag = file.etag;
  model.key = file.key;
  model.size = file.size;
  model.createdAt = file.createdAt;
  model.updatedAt = file.updatedAt;

  return model;
};
