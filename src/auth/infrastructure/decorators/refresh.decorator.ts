import { applyDecorators, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenGuard } from '../guards/refresh.guard';
export function RefreshAuth() {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    UseGuards(RefreshTokenGuard),
  );
}
