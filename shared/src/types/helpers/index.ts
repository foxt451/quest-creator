export const on = <DTO>(field: keyof DTO) => field;
export type NonNullableProperties<T> = { [K in keyof T]: NonNullable<T[K]> };
export function hasProps<
  T extends NonNullable<object>,
  U extends string | number | symbol
>(obj: T, ...propName: U[]): obj is T & { [P in U]: unknown } {
  return obj && propName.every((x) => x in obj);
}
