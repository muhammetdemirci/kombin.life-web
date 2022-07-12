// TODO MD change here
export interface EnvironmentVariables {
  APP_ENV: string;
  PORT: string;
  NODE_ENV: string;
  API_URL: string;
  TZ: string;
  DEFAULT_LANGUAGE: string;

  DATABASE_URL: string;
  DATABASE_TEST_URL: string;
  DATABASE_LOGS: string;

  REDIS_URL: string;
  REDIS_TEST_URL: string;

  SERVER_DOMAIN: string;
  SERVER_STORAGE: string;

  GRAPHQL_MAX_COMPLEXITY: string;

  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_TTL: string;
  JWT_SECRET: string;
  JWT_TTL: string;

  FRONTEND_URL: string;

  FIREBASE_SERVICE_ACCOUNTS: string;
  FIREBASE_CONFIG: string;

  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_S3_BUCKET: string;
  AWS_REGION: string;

  CLOUDINARY_URL: string;
}
