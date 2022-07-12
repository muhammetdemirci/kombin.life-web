import { Readable, Stream } from 'stream';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
import { FileUpload } from 'graphql-upload';
import { isString } from 'lodash';
import { EnvironmentVariables } from 'src/library/interfaces/environment-variables.interface';
import { HttpException } from 'src/library/models/error.model';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {
    const cloudinaryUrl = configService.get<string>('CLOUDINARY_URL') as string;
    if (!cloudinaryUrl) {
      throw new Error();
    }
    const [api_key, api_secret, cloud_name] = cloudinaryUrl.split(/cloudinary:\/\/|\.|@/).slice(1, 4);
    cloudinary.v2.config({
      cloud_name,
      api_key,
      api_secret,
      secure: true,
    });
  }

  getEnvFolder(): string {
    const env = this.configService.get('APP_ENV') as string;
    switch (env) {
      case 'production':
      case 'staging':
        return `app/${env}`;
      default:
        return 'app/development';
    }
  }

  async getUrlByPath(path: string): Promise<string> {
    const file = cloudinary.v2.url(path, { secure: true });
    return file;
  }

  async uploadByStream(
    stream: Stream | Readable,
    folder?: string,
    transformation?: cloudinary.TransformationOptions,
    format = 'png',
    mimetype = undefined,
  ): Promise<cloudinary.UploadApiResponse> {
    const cloudinaryStream = stream;
    const isVideo = format === 'mp4';
    const videoOptions: Partial<cloudinary.UploadApiOptions> = isVideo
      ? {
          eager: {
            format: 'mp4',
          },
          chunk_size: 5000000,
        }
      : {};
    const defaultVideoTransformation: Partial<cloudinary.TransformationOptions> = {};
    const videoTransformation: Partial<cloudinary.TransformationOptions> | undefined = isVideo
      ? defaultVideoTransformation
      : transformation;
    const formatProp = isVideo ? undefined : 'png';
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: isString(folder) ? folder : `app/${this.getEnvFolder()}`,
          unique_filename: true,
          transformation: videoTransformation,
          format: formatProp,
          resource_type: isVideo ? 'video' : 'image',
          ...videoOptions,
        },
        (error: cloudinary.UploadApiErrorResponse | undefined, result: cloudinary.UploadApiResponse | undefined) => {
          if (error) {
            reject(error);
          } else {
            if (result === undefined) {
              reject(result);
              return;
            }
            if (mimetype === 'video/x-matroska') {
              console.log(result.public_id);
              result.url = result.url.replace('/upload/', '/upload/f_webm/');
              result.url = result.url.replace('.mkv', '.webm');
              result.secure_url = result.secure_url.replace('/upload/', '/upload/f_webm/');
              result.secure_url = result.secure_url.replace('.mkv', '.webm');
            }
            resolve(result);
          }
        },
      );
      cloudinaryStream.pipe(uploadStream);
    });
  }

  async deleteByPath(path: string): Promise<any> {
    const result = await cloudinary.v2.uploader.destroy(path);
    return result;
  }

  /**
   * @description it's a helper to upload a file or an image file with options to the cloudinary
   * @param {FileUpload} upload - it's an uploading file
   * @param {string} path - it's a file path without environment
   * @returns {Promise<string>} - the method returns the public url of uploaded file.
   * @example
   * const url = await this.uploadFileToCloudinaryAsHelper(file, '/kombin-life');
   * if your APP_ENV is staging then the file will be uploaded to /app/staging/kombin-life/<file>
   */
  async uploadFileToCloudinaryAsHelper(file: FileUpload, path: string): Promise<cloudinary.UploadApiResponse> {
    const folder = this.getEnvFolder() + path;
    const isImage = file.mimetype.includes('image/');
    const isVideo = file.mimetype.includes('video/');
    let transformation;
    let format;
    if (isImage) {
      transformation = { width: 2048, height: 2048, crop: 'limit' };
      format = 'jpeg';
    } else if (isVideo) {
      transformation = { width: 1920, height: 1080, quality: 100, crop: 'limit' };
      format = 'mp4';
    }
    const cloudinaryFile = await this.uploadByStream(file.createReadStream(), folder, transformation, format);

    return cloudinaryFile;
  }

  async uploadImageFileToCloudinaryAsHelper(file: FileUpload, path: string): Promise<cloudinary.UploadApiResponse> {
    const folder = this.getEnvFolder() + path;
    const isImage = file.mimetype.includes('image/');
    if (!isImage) {
      throw new HttpException('the file has to be an image', 400);
    }
    const cloudinaryFile = await this.uploadByStream(
      file.createReadStream(),
      folder,
      { width: 2048, height: 2048, crop: 'limit' },
      'png',
      file.mimetype,
    );

    return cloudinaryFile;
  }

  async uploadVideoFileToCloudinaryAsHelper(file: FileUpload, path: string): Promise<cloudinary.UploadApiResponse> {
    const folder = this.getEnvFolder() + path;
    const isVideo = file.mimetype.includes('video/');
    if (!isVideo) {
      throw new HttpException('the file has to be a video', 400);
    }

    const cloudinaryFile = await this.uploadByStream(file.createReadStream(), folder, {}, 'mp4', file.mimetype);

    return cloudinaryFile;
  }
}
