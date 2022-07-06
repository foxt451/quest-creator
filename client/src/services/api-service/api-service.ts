import { RequestConfig } from "../../types/fetching/RequestConfig";
import { instance } from "./axios";

export const apiService = {
  async sendRequest<TResult, TData>(
    config: RequestConfig<TData>
  ): Promise<TResult> {
    const response = await instance.request<TResult>(config);
    return response.data;
  },
};
