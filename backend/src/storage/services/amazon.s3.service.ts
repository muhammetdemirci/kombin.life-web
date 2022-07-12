import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class AmazonS3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  async uploadFileToS3(file: FileUpload, key?: string): Promise<AWS.S3.ManagedUpload.SendData> {
    const Key = key ? key : file.filename;
    const stream = file.createReadStream();
    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET as string,
      Key,
      Body: stream,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };
    const result = await this.s3.upload(params).promise();
    return result;
  }

  async uploadObjectToS3(body: any, bucket: string, filepath: string, otherOptions: Partial<AWS.S3.PutObjectRequest>) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucket,
      Key: filepath,
      Body: body,
      ...otherOptions,
    };
    const result = await this.s3.upload(params).promise();
    return result;
  }

  async getFileFromS3(key: string): Promise<PromiseResult<AWS.S3.GetObjectOutput, AWS.AWSError>> {
    const file = await this.s3
      .getObject({
        Bucket: process.env.AWS_S3_BUCKET as string,
        Key: key,
      })
      .promise();
    return file;
  }

  async getFileStreamFromS3(key: string): Promise<AWS.Request<AWS.S3.GetObjectOutput, AWS.AWSError>> {
    const file = await this.s3.getObject({
      Bucket: process.env.AWS_S3_BUCKET as string,
      Key: key,
    });
    return file;
  }
}
