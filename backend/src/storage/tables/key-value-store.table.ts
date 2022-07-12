import { Model } from 'objection';

export class KeyValueStoreTable extends Model {
  static tableName = 'key_value_store';
  static idColumn = 'key';

  key!: string;
  value!: string;

  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
