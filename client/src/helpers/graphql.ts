import { errorMessages } from "../constants/messages";
import { apiService } from "../services/api-service/api-service";
import { GQLRequestBody } from "../types/fetching/GQLRequestBody";
import { GraphQLResponseRoot } from "../types/fetching/GQLResponse";

export const request = async <TResult>(
  url: string,
  data: GQLRequestBody
): Promise<TResult> => {
  const response = await apiService.sendRequest<
    GraphQLResponseRoot<TResult>,
    GQLRequestBody
  >({
    url,
    data,
    method: "POST",
  });
  return handleGraphQLResponse(response);
};

export const handleGraphQLResponse = <TResult>(
  response: GraphQLResponseRoot<TResult>
): TResult => {
  if (response.errors) {
    throw new Error("sd");
  }
  // if no data property in response, throw error
  if (response.data === undefined) {
    throw new Error(errorMessages.default);
  }

  return response.data;
};
