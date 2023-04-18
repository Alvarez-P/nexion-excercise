import { Module } from '@nestjs/common';
import { DbProvider } from './infrastructure/db.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DbProvider, ConfigService],
  exports: [DbProvider],
})
export class CoreModule {}
