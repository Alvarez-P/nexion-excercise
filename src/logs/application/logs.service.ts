import { Inject, Injectable } from '@nestjs/common';
import { LOG_REPOSITORY } from '../constants';
import { TLogRepository } from '../infrastructure/logs.repository';
import { QueryLogsDto } from '../domain/dto/input/query-logs.dto';
import { QueryBuilder } from 'src/core/application/query-builder.service';
import { LogFilters } from '../domain/logs.filters';
import { LogModel } from '../domain/logs.model';
import { Pagination } from 'src/core/types/pagination.interface';
import { plainToInstance } from 'class-transformer';
import { DB_MANAGER } from 'src/core/constants';
import { TransactionManager } from 'src/core/types/transaction-manager.interface';
import { BaseLogDto } from '../domain/dto/output/base-log.dto';

@Injectable()
export class LogsService {
  constructor(
    @Inject(LOG_REPOSITORY)
    private logRepository: TLogRepository,
    private queryBuilder: QueryBuilder<LogFilters, LogModel>,
    @Inject(DB_MANAGER)
    private transactionManager: TransactionManager,
  ) {}

  async findAll(queryDto: QueryLogsDto) {
    const query = this.queryBuilder.build(queryDto);
    const results = await this.logRepository.findAndCountAll({
      ...query,
      include: ['employee'],
    });
    const response: Pagination<BaseLogDto> = {
      items: plainToInstance(BaseLogDto, results.rows),
      count: results.count,
      offset: query.offset,
      limit: query.limit,
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }

  async findOne(id: string) {
    const result = await this.logRepository.findOne({
      where: { id },
      include: ['category'],
      raw: true,
      nest: true,
    });
    const response = {
      item: plainToInstance(BaseLogDto, result),
      lastSyncAt: new Date().toISOString(),
    };
    return response;
  }
  remove(id: string, deletedBy: string) {
    return this.transactionManager.transaction(async (transaction) => {
      await this.logRepository.update(
        { deletedBy },
        { where: { id }, transaction },
      );
      return this.logRepository.destroy({
        where: { id },
        transaction,
      });
    });
  }
}
