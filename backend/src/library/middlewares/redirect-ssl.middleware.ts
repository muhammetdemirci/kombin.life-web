import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RedirectSslMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (this.isRedirectNeeded(req)) {
      this.redirectSsl(req, res);
    } else {
      next();
    }
  }

  private isRedirectNeeded(req: Request): boolean {
    if (process.env.NODE_ENV !== 'production') {
      return false;
    }
    if (req.secure) {
      return false;
    }
    if (req.method.toLowerCase() !== 'get') {
      return false;
    }
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return true;
    }
    return false;
  }

  private redirectSsl(req: Request, res: Response): void {
    const sslUrl = 'https' + '://' + req.get('host') + req.originalUrl;
    res.redirect(sslUrl);
  }
}
