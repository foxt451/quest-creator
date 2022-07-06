export type GraphQLResponseRoot<TResult> = {
  data?: TResult;
  errors?: Array<IGraphQLResponseError>;
};

export interface IGraphQLResponseError {
  message: string; // Required for all errors
  locations?: Array<IGraphQLResponseErrorLocation>;
}

export interface IGraphQLResponseErrorLocation {
  line: number;
  column: number;
}
