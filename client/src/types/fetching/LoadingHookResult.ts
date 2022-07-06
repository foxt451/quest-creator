import { ErrorState } from "./ErrorState";

export interface LoadingHookResult<TResult> {
  loading: boolean;
  error: ErrorState;
  data: TResult | null;
}
