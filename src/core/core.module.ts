import { Module } from '@nestjs/common';
import { DbProvider } from './infrastructure/db/db.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptionService } from './application/encryption.service';

@Module({
  imports: [ConfigModule],
  providers: [DbProvider, ConfigService, EncryptionService],
  exports: [DbProvider, EncryptionService],
})
export class CoreModule {}
