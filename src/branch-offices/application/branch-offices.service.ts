import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBranchOfficeDto } from '../domain/dto/input/create-branch-office.dto';
import { UpdateBranchOfficeDto } from '../domain/dto/input/update-branch-office.dto';
import { BRANCH_OFFICE_REPOSITORY } from '../constants';
import { TBranchOfficeRepository } from '../infrastructure/branch-offices.repository';
import { BranchOfficeFilters } from '../domain/branch-office.filters';
import { BranchOfficeModel } from '../domain/branch-office.model';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { BranchOfficeBuilder } from '../domain/branch-office.builder';
import { plainToInstance } from 'class-transformer';
import { BaseBranchOfficeDto } from '../domain/dto/output/base-branch-office.dto';
import { Pagination } from 'src/core/types/pagination.interface';
import { QueryBranchOfficeDto } from '../domain/dto/input/query-branch-office.dto';
import { DB_MANAGER } from 'src/core/constants';
import { TransactionManager } from 'src/core/types/transaction-manager.interface';
import { Op } from 'sequelize';

@Injectable()
export class BranchOfficesService {
  constructor(
    @Inject(BRANCH_OFFICE_REPOSITORY)
    private branchOfficeRepository: TBranchOfficeRepository,
    @Inject(DB_MANAGER)
    private transactionManager: TransactionManager,
    private queryBuilder: QueryBuilder<BranchOfficeFilters, BranchOfficeModel>,
  ) {}

  async create(branchOfficeDto: CreateBranchOfficeDto, createdBy: string) {
    const branchNameIsInUse = await this.branchOfficeRepository.findOne({
      where: { name: branchOfficeDto.name },
    });
    if (branchNameIsInUse)
      throw new BadRequestException('Branch name is already in use');
    const branchOffice = new BranchOfficeBuilder()
      .name(branchOfficeDto.name)
      .address(branchOfficeDto.address)
      .createdBy(createdBy)
      .updatedBy(createdBy)
      .build();
    const saved = await this.branchOfficeRepository.create(branchOffice);
    return plainToInstance(BaseBranchOfficeDto, saved.toJSON());
  }

  async findAll(queryDto: QueryBranchOfficeDto) {
    const query = this.queryBuilder.build(queryDto);
    const results = await this.branchOfficeRepository.findAndCountAll(query);
    const response: Pagination<BaseBranchOfficeDto> = {
      items: plainToInstance(BaseBranchOfficeDto, results.rows),
      count: results.count,
      offset: query.offset,
      limit: query.limit,
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async findOne(id: string) {
    const result = await this.branchOfficeRepository.findOne({
      where: { id },
      raw: true,
      nest: true,
    });
    const response = {
      item: plainToInstance(BaseBranchOfficeDto, result),
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async update(
    id: string,
    branchOfficeDto: UpdateBranchOfficeDto,
    updatedBy: string,
  ) {
    if (branchOfficeDto.name) {
      const branchNameIsInUse = await this.branchOfficeRepository.findOne({
        where: { name: branchOfficeDto.name, id: { [Op.not]: id } },
      });
      if (branchNameIsInUse)
        throw new BadRequestException('Branch name is already in use');
    }
    return this.branchOfficeRepository.update(
      { ...branchOfficeDto, updatedBy },
      { where: { id } },
    );
  }

  remove(id: string, deletedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      await this.branchOfficeRepository.update(
        { deletedBy },
        { where: { id }, transaction },
      );
      return this.branchOfficeRepository.destroy({
        where: { id },
        transaction,
      });
    });
  }
}
