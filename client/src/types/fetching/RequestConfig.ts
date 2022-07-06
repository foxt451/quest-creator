export interface RequestConfig<TData> {
  url: string;
  data: TData;
  method: "GET" | "POST" | "PUT" | "DELETE";
}
