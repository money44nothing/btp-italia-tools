export interface ListSelection<T, S> {
  list: T[];
  selected?: S;
}

export function emptyListSelection<T, S = T>(v?: T[]): ListSelection<T, S> {
  return { list: v ?? [] };
}
