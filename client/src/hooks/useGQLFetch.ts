import useFetch from "./useFetch";
import { apiUrl } from "../env/env";

const useGQLFetch = (
  {
    baseURL = apiUrl,
    query,
    variables = {},
  }: { baseURL?: string; query: string; variables?: Record<string, any> },
  deps: any[]
) => {
  const { data, error, loading } = useFetch(
    { baseURL, data: { query, variables }, method: "POST" },
    deps
  );

  return { data: data?.data, error, loading };
};

export default useGQLFetch;
