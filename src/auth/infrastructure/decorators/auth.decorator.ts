import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: string[]) {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    SetMetadata('roles', roles),
    UseGuards(RolesGuard),
  );
}
