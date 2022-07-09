import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserGender } from '../enums/user-gender.enum';
import { UserRole } from '../enums/user-role.enum';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field(() => UserRole)
  role!: UserRole;

  @Field(() => String)
  email!: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => Date, { nullable: true })
  birthday?: Date;

  @Field(() => UserGender, { nullable: true })
  gender?: UserGender;

  @Field(() => String, { nullable: true })
  timezoneName?: string;

  @Field(() => [String])
  spokenLanguages: string[];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
