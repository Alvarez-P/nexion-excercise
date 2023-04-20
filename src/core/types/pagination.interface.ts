export interface Pagination<T> {
  limit: number;
  offset: number;
  items: T[];
  count: number;
  lastSyncAt: string;
}
