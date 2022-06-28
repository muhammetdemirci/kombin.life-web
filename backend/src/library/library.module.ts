import { Module } from '@nestjs/common';

import { DateScalar } from './scalars/date.scalar';

@Module({
  imports: [],
  providers: [DateScalar],
  exports: [DateScalar],
  controllers: [],
})
export class LibraryModule {}
