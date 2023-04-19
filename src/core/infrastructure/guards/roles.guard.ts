import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeeRole } from 'src/core/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.get<EmployeeRole[]>('roles', ctx.getHandler());
    if (!roles) return true;
    const request = ctx.switchToHttp().getRequest();
    return roles.includes(request.user.role);
  }
}
