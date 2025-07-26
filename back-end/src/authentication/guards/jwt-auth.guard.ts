import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw new HttpException(
        'toasts.httpErrors.notConnected',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
