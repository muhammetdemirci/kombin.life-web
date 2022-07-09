import Redis from 'ioredis';

export class RedisService {
  client: Redis.Redis;

  constructor() {
    const url = process.env.NODE_ENV === 'production' ? process.env.REDIS_TLS_URL : process.env.REDIS_URL;
    const options: Redis.RedisOptions =
      process.env.NODE_ENV === 'production' ? { tls: { rejectUnauthorized: false }, maxRetriesPerRequest: 100 } : {};
    this.client = new Redis(url, options);
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.client.keys(pattern);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string): Promise<'OK' | null> {
    return await this.client.set(key, value);
  }

  async expire(key: string, seconds: number): Promise<number> {
    const response = await this.client.expire(key, seconds);
    return response;
  }

  // expired is -1
  async ttl(key: string): Promise<number> {
    const number = await this.client.ttl(key);
    return number;
  }

  async delete(keys: string | string[]): Promise<number> {
    if (typeof keys === 'string') {
      return await this.client.del(keys);
    }
    return await this.client.del(...keys);
  }

  getClient(): Redis.Redis {
    return this.client;
  }
}
