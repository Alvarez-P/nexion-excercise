import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';

@Module({
  providers: [AuthService],
})
export class AuthModule {}
