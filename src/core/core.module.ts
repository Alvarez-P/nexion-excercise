import { Global, Module } from '@nestjs/common';
import { DbProvider } from './infrastructure/db/db.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptionService } from './application/encryption.service';
import { QueryBuilder } from './application/query-builder.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DbProvider, ConfigService, EncryptionService, QueryBuilder],
  exports: [DbProvider, EncryptionService, QueryBuilder],
})
export class CoreModule {}
