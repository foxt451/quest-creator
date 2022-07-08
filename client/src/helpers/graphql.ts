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
  if (response.errors || response.data === undefined) {
    let errorMessage: string = errorMessages.default;
    if (response.errors && response.errors.length > 0) {
      errorMessage = response.errors[0].message;
    }
    throw new Error(errorMessage);
  }
  return response.data;
};
