export interface TransactionManager {
  transaction: (fn: (...args: any[]) => any) => Promise<any>;
}
