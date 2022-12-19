export interface ListSelection<T> {
  list: T[];
  selected?: T;
}

export function emptyListSelection<T>(v?: T[]): ListSelection<T> {
  return { list: v ?? [] };
}
