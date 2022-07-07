export const on = <DTO>(field: keyof DTO) => field;
export type NonNullableProperties<T> = { [K in keyof T]: NonNullable<T[K]> };
