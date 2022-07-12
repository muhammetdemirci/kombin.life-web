import { Model, RelationMappings } from 'objection';

import { AvatarTypeEnum } from '../enums/avatar-type.enum';
import { UserGenderEnum } from '../enums/user-gender.enum';
import { UserRoleEnum } from '../enums/user-role.enum';
import { FcmRegistrationTokenTable } from './fcm-registration-token.table';

export class UserTable extends Model {
  static tableName = 'user';

  id!: string;
  firebaseUID!: string;

  email!: string;
  handle!: string;
  role!: UserRoleEnum;

  firstName!: string;
  lastName!: string;
  description?: string;
  gender!: UserGenderEnum;
  birthday?: Date;

  avatarType!: AvatarTypeEnum;
  avatar?: string;

  // social media handles
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;

  timezoneName!: string;
  spokenLanguages!: string[];
  createdAt!: Date;
  updatedAt!: Date;

  static relationMappings(): RelationMappings {
    return {
      fcmRegistrationTokens: {
        relation: Model.HasManyRelation,
        modelClass: FcmRegistrationTokenTable,
        join: {
          from: 'user.id',
          to: 'fcm_registration_token.userId',
        },
      },
    };
  }

  fcmRegistrationTokens?: FcmRegistrationTokenTable;
}
