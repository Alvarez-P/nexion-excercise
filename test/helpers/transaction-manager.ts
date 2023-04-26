import {
  TransactionCallback,
  TransactionManager,
} from 'src/core/types/transaction-manager.interface';

export class TransactionManagerMock implements TransactionManager {
  transaction(fn: TransactionCallback) {
    return fn();
  }
}
