import { Model, RelationMappings } from 'objection';

import { UserGender } from '../enums/user-gender.enum';
import { UserRole } from '../enums/user-role.enum';
import { FcmRegistrationTokenTable } from './fcm-registration-token.table';

export class UserTable extends Model {
  static tableName = 'user';

  id!: string;
  firebaseUID!: string;

  email!: string;
  role!: UserRole;
  firstName!: string;
  lastName!: string;
  gender!: UserGender;
  birthday?: Date;
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
