import axios from "axios";

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
          error.response.data.errors[0]?.message ??
            "An error ocurred. Try again later or contact support"
        );
      }
    }
    throw error;
  }
};
