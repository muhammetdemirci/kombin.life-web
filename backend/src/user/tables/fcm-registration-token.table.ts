import { Model, RelationMappings } from 'objection';

import { UserTable } from './user.table';

export class FcmRegistrationTokenTable extends Model {
  static tableName = 'fcm_registration_token';

  id!: string;
  userId!: string;
  deviceId!: string;
  token!: string;
  createdAt!: Date;

  static relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserTable,
        join: {
          from: 'fcm_registration_token.userId',
          to: 'user.id',
        },
      },
    };
  }

  user?: UserTable;
}
