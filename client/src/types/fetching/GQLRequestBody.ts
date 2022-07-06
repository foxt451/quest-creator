export interface GQLRequestBody {
  query: string;
  variables: Record<string, unknown>;
}
