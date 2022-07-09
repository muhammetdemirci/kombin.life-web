import { ConsoleLogger } from '@nestjs/common';

export class ConsoleJsonLogger extends ConsoleLogger {
  log(message: string, context?: any): any {
    const log = {
      severity: 'info',
      logger: 'ConsoleLogger',
      message,
      context,
    };
    console.log(JSON.stringify(log));
  }

  error(message: any, trace?: string, context?: string): any {
    const log = {
      severity: 'error',
      logger: 'ConsoleLogger',
      message,
      trace,
      context,
    };

    console.error(JSON.stringify(log));
  }

  exception(error: Error, handler?: string, extra?: { [key: string]: any }): any {
    if (process.env.APP_ENV === 'local') {
      console.log(error);
    }
    const log = {
      severity: 'error',
      logger: 'ConsoleLogger',
      handler,
      ...error,
      ...extra,
    };

    console.error(JSON.stringify(log));
  }

  warn(message: any, context?: string): any {
    const log = {
      severity: 'warning',
      logger: 'ConsoleLogger',
      message,
      context,
    };

    console.error(JSON.stringify(log));
  }
}
