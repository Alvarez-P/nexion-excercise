import { Log } from './log.entity';

export type LogFilters = Omit<Log, 'deletedAt' | 'deletedBy'>;
