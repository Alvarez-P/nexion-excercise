import { Module } from '@nestjs/common';
import { BranchOfficesService } from './application/branch-offices.service';
import { BranchOfficesController } from './infrastructure/branch-offices.controller';
import { BranchOfficeRepository } from './infrastructure/branch-offices.repository';

@Module({
  controllers: [BranchOfficesController],
  providers: [BranchOfficesService, BranchOfficeRepository],
})
export class BranchOfficesModule {}
