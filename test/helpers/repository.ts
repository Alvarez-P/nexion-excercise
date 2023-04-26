/* eslint-disable @typescript-eslint/no-unused-vars */

import { IBaseEntity } from 'src/core/domain/base.entity';

export function MockRepositoryFactory<M extends IBaseEntity>(items: M[]) {
  return {
    create: jest.fn().mockImplementation((dto: M) => {
      return Promise.resolve({ ...dto, toJSON: () => dto });
    }),
    findOne: jest.fn().mockImplementation((...args: any[]) => {
      if (args[0]?.where) {
        const keys = Object.keys(args[0].where);
        return Promise.resolve(
          items.find((item: M) => item[keys[0]] === args[0].where[keys[0]]),
        );
      }
      return Promise.resolve(null);
    }),
    findAndCountAll: jest.fn().mockImplementation((..._args: any[]) => {
      return Promise.resolve({ rows: items, count: items.length });
    }),
    update: jest.fn().mockImplementation((...args: any[]) => {
      return Promise.resolve([args[0].length]);
    }),
    destroy: jest.fn().mockImplementation((..._args: any[]) => {
      return Promise.resolve([1]);
    }),
  };
}
