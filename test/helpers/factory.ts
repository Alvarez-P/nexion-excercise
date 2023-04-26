export type ItemOrList<L, T> = L extends undefined ? T : T[];

export function factory<T>(defaultItem: T) {
  function build<L extends undefined | number = undefined>(
    overrider: Partial<T>,
    length?: L,
  ) {
    const item: T = { ...defaultItem, ...overrider };
    const response = length ? Array<T>(length).fill(item) : item;
    return response as ItemOrList<L, T>;
  }
  return build;
}
