import { forwardRef, Module } from '@nestjs/common';
import { LibraryModule } from 'src/library/library.module';
import { UserResolver } from 'src/user/resolvers/user.resolver';

@Module({
  imports: [
    forwardRef(() => LibraryModule),
  ],
  providers: [
    UserResolver,
  ],
  exports: [],
  controllers: [],
})
export class UserModule {}
