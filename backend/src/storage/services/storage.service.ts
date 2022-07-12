import { Injectable } from '@nestjs/common';
import { uuid } from 'src/library/utilities/uuid';

import { FileUploadDto } from '../dtos/file-upload.dto';
import { ImageUploadDto } from '../dtos/image-upload.dto';
import { VideoUploadDto } from '../dtos/video-upload.dto';
import { FileStatusEnum } from '../enums/file-status.enum';
import { FileStorageEnum } from '../enums/file-storage.enum';
import { FileTable } from '../tables/file.table';
import { AmazonS3Service } from './amazon.s3.service';
import { CloudinaryService } from './cloudinary.service';
import { FileService } from './file.service';

@Injectable()
export class StorageService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private amazonService: AmazonS3Service,
    private fileService: FileService,
  ) {}

  async uploadImage(data: ImageUploadDto): Promise<FileTable | null> {
    let file: FileTable | null;
    if (data.file) {
      file = await this.fileService.getFileById(data.file.id);
      if (!file) {
        file = await this.fileService.createFile({
          relation: data.relation,
          relationId: data.relationId,
          status: FileStatusEnum.UPLOADING,
        });
      }
    } else {
      file = await this.fileService.createFile({
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.UPLOADING,
      });
    }
    try {
      const cloudinaryFile = await this.cloudinaryService.uploadImageFileToCloudinaryAsHelper(data.upload, data.path);
      file = await this.fileService.updateFile(file.id, {
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.DONE,
        storage: FileStorageEnum.CLOUDINARY,
        key: cloudinaryFile.public_id,
        size: cloudinaryFile.bytes,
        filename: data.upload.filename,
        alias: cloudinaryFile.original_filename,
        mimeType: data.upload.mimetype,
        url: cloudinaryFile.secure_url,
      });
      return file;
    } catch (error) {
      if (!file) {
        return null;
      }
      file = await this.fileService.updateFile(file.id, {
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.ERROR,
        storage: FileStorageEnum.CLOUDINARY,
        filename: data.upload.filename,
        mimeType: data.upload.mimetype,
      });
      return file;
    }
  }

  async uploadVideo(data: VideoUploadDto): Promise<FileTable | null> {
    let file: FileTable | null;
    if (data.file) {
      file = await this.fileService.getFileById(data.file.id);
      if (!file) {
        file = await this.fileService.createFile({
          relation: data.relation,
          relationId: data.relationId,
          status: FileStatusEnum.UPLOADING,
        });
      }
    } else {
      file = await this.fileService.createFile({
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.UPLOADING,
      });
    }
    try {
      const cloudinaryFile = await this.cloudinaryService.uploadVideoFileToCloudinaryAsHelper(data.upload, data.path);
      file = await this.fileService.updateFile(file.id, {
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.DONE,
        storage: FileStorageEnum.CLOUDINARY,
        key: cloudinaryFile.public_id,
        size: cloudinaryFile.bytes,
        filename: data.upload.filename,
        alias: cloudinaryFile.original_filename,
        mimeType: data.upload.mimetype,
        url: cloudinaryFile.secure_url,
      });
      return file;
    } catch (error) {
      if (!file) {
        return null;
      }
      file = await this.fileService.updateFile(file.id, {
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.ERROR,
        storage: FileStorageEnum.CLOUDINARY,
        filename: data.upload.filename,
        mimeType: data.upload.mimetype,
      });
      return file;
    }
  }

  async uploadFile(data: FileUploadDto): Promise<FileTable | null> {
    let file: FileTable | null;
    if (data.file) {
      const foundFile = await this.fileService.getFileById(data.file.id);
      if (foundFile) {
        file = foundFile;
      } else {
        file = await this.fileService.createFile({
          relation: data.relation,
          relationId: data.relationId,
          status: FileStatusEnum.UPLOADING,
        });
      }
    } else {
      file = await this.fileService.createFile({
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.UPLOADING,
      });
    }
    try {
      const extension = data.upload.filename.split('.').pop();
      const awsFile = await this.amazonService.uploadFileToS3(data.upload, `${data.path}/${uuid()}.${extension}`);
      const awsFileInfo = await this.amazonService.getFileFromS3(awsFile.Key);
      file = await this.fileService.updateFile(file.id, {
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.DONE,
        storage: FileStorageEnum.AMAZON_S3,
        key: awsFile.Key,
        size: awsFileInfo.ContentLength,
        filename: data.upload.filename,
        alias: awsFile.Key,
        mimeType: data.upload.mimetype,
        url: awsFile.Location,
      });
      return file;
    } catch (error) {
      if (!file) {
        throw new Error();
      }
      file = await this.fileService.updateFile(file.id, {
        relation: data.relation,
        relationId: data.relationId,
        status: FileStatusEnum.DONE,
        storage: FileStorageEnum.AMAZON_S3,
        filename: data.upload.filename,
        mimeType: data.upload.mimetype,
      });
      return file;
    }
  }
}
