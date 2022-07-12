import { forwardRef, Module } from '@nestjs/common';
import { LibraryModule } from 'src/library/library.module';
import { UserModule } from 'src/user/user.module';

import { AmazonS3Service } from './services/amazon.s3.service';
import { CloudinaryService } from './services/cloudinary.service';
import { FileService } from './services/file.service';
import { KeyValueStoreService } from './services/key-value-store.service';
import { StorageService } from './services/storage.service';

@Module({
  imports: [forwardRef(() => LibraryModule), forwardRef(() => UserModule)],
  controllers: [],
  providers: [FileService, CloudinaryService, AmazonS3Service, StorageService, KeyValueStoreService],
  exports: [FileService, CloudinaryService, AmazonS3Service, StorageService, KeyValueStoreService],
})
export class StorageModule {}
