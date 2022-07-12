import {
  HttpException as HttpExceptionBase,
  NotFoundException as NotFoundExceptionBase,
  ForbiddenException as ForbiddenExceptionBase,
  BadRequestException as BadRequestExceptionBase,
  ConflictException as ConflictExceptionBase,
  MethodNotAllowedException as MethodNotAllowedExceptionBase,
  GoneException as GoneExceptionBase,
} from '@nestjs/common';

export class HttpException extends HttpExceptionBase {
  createdByUs = true;
}

export class NotFoundException extends NotFoundExceptionBase {
  createdByUs = true;
}

export class ForbiddenException extends ForbiddenExceptionBase {
  createdByUs = true;
}

export class BadRequestException extends BadRequestExceptionBase {
  createdByUs = true;
}

export class ConflictException extends ConflictExceptionBase {
  createdByUs = true;
}

export class MethodNotAllowedException extends MethodNotAllowedExceptionBase {
  createdByUs = true;
}

export class GoneException extends GoneExceptionBase {
  createdByUs = true;
}
