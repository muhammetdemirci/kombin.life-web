import { Injectable } from '@nestjs/common';

import { KeyValueStoreTable } from '../tables/key-value-store.table';

@Injectable()
export class KeyValueStoreService {
  constructor() {}

  async get(key: string) {
    const result = await KeyValueStoreTable.query().where('key', key).first();
    return result?.value;
  }

  async set(key: string, value: string) {
    const exist = await KeyValueStoreTable.query().where('key', key).first();
    if (exist) {
      exist.value = value;
      return await KeyValueStoreTable.query().updateAndFetchById(exist.key, exist);
    } else {
      const newRecord = new KeyValueStoreTable();
      newRecord.key = key;
      newRecord.value = value;
      return await KeyValueStoreTable.query().insertAndFetch(newRecord);
    }
  }
}
