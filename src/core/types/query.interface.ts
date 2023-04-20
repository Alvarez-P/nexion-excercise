export interface RangeQueryNumber {
  from?: number;
  to?: number;
}

export interface RangeQueryDate {
  from?: Date;
  to?: Date;
}

export interface CommonQuery<T> {
  offset?: number;
  limit?: number;
  orderBy?: keyof T;
  sort?: 'asc' | 'desc';
}

export type EntityQueries<T> = {
  [K in keyof T]?: T[K] extends number
    ? number | Readonly<RangeQueryNumber>
    : T[K] extends Date
    ? Date | Readonly<RangeQueryDate>
    : T[K];
};

export type Query<T> = Readonly<CommonQuery<T>> & Readonly<EntityQueries<T>>;
