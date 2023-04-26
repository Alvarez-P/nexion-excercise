import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeeRole } from 'src/core/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<EmployeeRole[]>('roles', ctx.getHandler());
    const request = ctx.switchToHttp().getRequest();
    if (request.user.token_type !== 'access_token')
      throw new UnauthorizedException('Must be sent access token');
    if (!roles) return true;
    return roles.includes(request.user.role);
  }
}
