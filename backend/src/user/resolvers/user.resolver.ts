
import { Query, Resolver } from '@nestjs/graphql';

import { UserModel } from '../models/user.model';

@Resolver(() => UserModel)
export class UserResolver {
  constructor() {}

  @Query(() => Boolean, { name: 'apiWorks' })
  async apiWorks(): Promise<boolean> {
    return true;
  }
}
