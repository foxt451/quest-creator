import useFetch from "./useFetch";
import { ENV } from "../env/env";
import { GQLRequestBody } from "../types/fetching/GQLRequestBody";
import { errorMessages } from "../constants/messages";
import { GraphQLResponseRoot } from "../types/fetching/GQLResponse";
import { handleGraphQLResponse } from "../helpers/graphql";
import { LoadingHookResult } from "../types/fetching/LoadingHookResult";

const useGQLFetch = <TResult>(
  { url = ENV.API_URL, body }: { url?: string; body: GQLRequestBody },
  deps: unknown[]
): LoadingHookResult<TResult> => {
  const {
    data: GQLData,
    error,
    loading,
  } = useFetch<GraphQLResponseRoot<TResult>, GQLRequestBody>(
    { url, method: "POST", data: body },
    deps
  );
  try {
    const data = GQLData === null ? GQLData : handleGraphQLResponse(GQLData);
    return { data, error, loading };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : errorMessages.default,
      loading,
    };
  }
};

export default useGQLFetch;
