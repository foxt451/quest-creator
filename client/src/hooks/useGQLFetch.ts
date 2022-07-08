import useFetch from "./useFetch";
import { ENV } from "../env/env";
import { GQLRequestBody } from "../types/fetching/GQLRequestBody";
import { errorMessages } from "../constants/messages";
import { GraphQLResponseRoot } from "../types/fetching/GQLResponse";
import { handleGraphQLResponse } from "../helpers/graphql";
import { LoadingHookResult } from "../types/fetching/LoadingHookResult";
import { getMessageOfCaughtError } from "../helpers/errors";

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
  } catch (e) {
    return {
      data: null,
      error: getMessageOfCaughtError(e),
      loading,
    };
  }
};

export default useGQLFetch;
