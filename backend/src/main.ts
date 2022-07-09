import { EventEmitter } from 'events';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';

import { AppModule } from './app.module';
import { ConsoleJsonLogger } from './library/loggers/console.logger';

EventEmitter.defaultMaxListeners = 100;

function handleUnhandled() {
  const logger = new ConsoleJsonLogger();

  process.on('uncaughtException', logger.exception).on('unhandledRejection', logger.exception);
}
handleUnhandled();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };

  app.use(urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(json({ verify: rawBodyBuffer }));

  if (process.env.NODE_ENV === 'production') {
    app.useLogger(app.get(ConsoleJsonLogger));
  }

  app.enableCors();

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);

  await app.listen(+configService.get('PORT'));
}
void bootstrap();
