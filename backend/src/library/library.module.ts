import { Module } from '@nestjs/common';

import { RedisService } from './services/redis.service';

@Module({
  imports: [],
  providers: [RedisService],
  exports: [RedisService],
  controllers: [],
})
export class LibraryModule {}
