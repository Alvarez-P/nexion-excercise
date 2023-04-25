import { Module } from '@nestjs/common';
import { BranchOfficesService } from './application/branch-offices.service';
import { BranchOfficesController } from './infrastructure/branch-offices.controller';
import { BranchOfficeRepository } from './infrastructure/branch-offices.repository';
import { CoreModule } from 'src/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { QueryBuilder } from 'src/core/application/query-builder.service';

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [BranchOfficesController],
  providers: [BranchOfficesService, BranchOfficeRepository, QueryBuilder],
})
export class BranchOfficesModule {}
