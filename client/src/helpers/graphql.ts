import axios from "axios";
import { errorMessages } from "../constants/messages";

export const request = async (
  url: string,
  { query, variables }: { query: string; variables: Record<string, any> }
) => {
  try {
    const data = await axios.post(url, {
      query,
      variables,
    });
    return data;
  } catch (error: any) {
    if (error?.response?.data?.errors) {
      if (Array.isArray(error.response.data.errors)) {
        throw new Error(
          error.response.data.errors[0]?.message ?? errorMessages.default
        );
      }
    }
    throw error;
  }
};
