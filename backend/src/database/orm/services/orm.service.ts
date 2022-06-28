import { Inject, Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import { AnyModelConstructor, initialize, Model } from 'objection';

import { ConfigProvider } from '../constants/config-provider.constant';
import { ModelsProvider } from '../constants/models.provider';

@Injectable()
export class OrmService {
  public readonly knex: Knex;

  constructor(
    @Inject(ConfigProvider)
    public readonly config: Knex.Config,

    @Inject(ModelsProvider)
    public readonly models: AnyModelConstructor[],
  ) {
    this.knex = knex(this.config);
    Model.knex(this.knex);

    void initialize(this.knex, this.models);
  }
}
