import * as Joi from '@hapi/joi';

const errorHandler = (key: string) =>
  new Error(`${key} is not set as the environment variable`);

const defaultStringVariable = (
  key: string,
  defaultValue: string,
): Record<string, Joi.StringSchema> => ({
  [key]: Joi.string().default(defaultValue).error(errorHandler(key)),
});

const requiredStringVariable = (
  key: string,
): Record<string, Joi.StringSchema> => ({
  [key]: Joi.string().required().error(errorHandler(key)),
});

export const configValidation = Joi.object({
  ...defaultStringVariable('NODE_ENV', 'development'),
  ...requiredStringVariable('APP_ENV'),

  ...requiredStringVariable('DATABASE_URL'),
  ...requiredStringVariable(
    process.env.NODE_ENV === 'production' ? 'REDIS_TLS_URL' : 'REDIS_URL',
  ),
  ...requiredStringVariable('DATABASE_LOGS'),
  ...requiredStringVariable('DEFAULT_LANGUAGE'),

  ...defaultStringVariable('SERVER_STORAGE', '/static'),

  ...defaultStringVariable('TZ', 'UTC'),

  ...requiredStringVariable('JWT_REFRESH_SECRET'),
  ...requiredStringVariable('JWT_REFRESH_TTL'),
  ...requiredStringVariable('JWT_SECRET'),
  ...requiredStringVariable('JWT_TTL'),

  ...requiredStringVariable('FRONTEND_URL'),
});
