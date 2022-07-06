import { errorMessages } from "../constants/messages";
import { apiService } from "./api-service";

export const request = async (
  url: string,
  { query, variables }: { query: string; variables: Record<string, any> }
) => {
  const data = await apiService.post(url, {
    query,
    variables,
  });
  
  if (
    data.data.errors &&
    Array.isArray(data.data.errors) &&
    data.data.errors.length > 0
  ) {
    throw new Error(data.data.errors[0]?.message ?? errorMessages.default);
  }
  return data;
};
