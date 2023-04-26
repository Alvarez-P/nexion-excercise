export type TransactionCallback = (...args: any[]) => any;
export interface TransactionManager {
  transaction: (fn: TransactionCallback) => Promise<any>;
}
