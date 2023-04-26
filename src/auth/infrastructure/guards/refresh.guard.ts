import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();
    if (request.user.token_type !== 'refresh_token')
      throw new UnauthorizedException('Must be sent refresh token');
    return true;
  }
}
