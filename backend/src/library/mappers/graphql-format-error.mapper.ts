import { HttpStatus } from '@nestjs/common';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ConsoleJsonLogger } from 'src/library/loggers/console.logger';

const consoleLogger = new ConsoleJsonLogger();

export const mapGraphqlFormatError = (error: GraphQLError): GraphQLFormattedError<Record<string, any>> => {
  consoleLogger.exception(error);

  const status = error.extensions?.exception?.status;

  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'Internal server error';
  let messageKey = 'api-error-message-internal-server-error';
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      code = 'BAD_USER_INPUT';
      message = 'Bad user input';
      messageKey = 'api-error-message-bad-user-input';
      break;
    case HttpStatus.UNAUTHORIZED:
      code = 'UNAUTHENTICATED';
      message = 'Unauthenticated';
      messageKey = 'api-error-message-unauthenticated';
      break;
    case HttpStatus.FORBIDDEN:
      code = 'FORBIDDEN';
      message = 'Forbidden';
      messageKey = 'api-error-message-forbidden';
      break;
    case HttpStatus.NOT_FOUND:
      code = 'NOT_FOUND';
      message = 'Not found';
      messageKey = 'api-error-message-not-found';
      break;
    case HttpStatus.CONFLICT:
      code = 'CONFLICT';
      message = 'Conflict';
      messageKey = 'api-error-message-conflict';
      break;
  }

  if (error.extensions?.exception?.createdByUs) {
    code = error.extensions?.exception?.code;
    message = error.extensions?.exception?.message;
    messageKey = error.extensions?.exception?.messageKey;
  }

  return {
    message,
    extensions: {
      messageKey,
      status,
      code,
      datetime: new Date(),
    },
  };
};
