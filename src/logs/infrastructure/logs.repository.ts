import { LOG_REPOSITORY } from '../constants';
import { LogModel } from '../domain/logs.model';

export const LogRepository = {
  provide: LOG_REPOSITORY,
  useValue: LogModel,
};

export type TLogRepository = typeof LogModel;
