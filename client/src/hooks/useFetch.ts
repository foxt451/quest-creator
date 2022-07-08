import { useState, useEffect } from "react";
import { ErrorState } from "../types/fetching/ErrorState";
import { RequestConfig } from "../types/fetching/RequestConfig";
import { LoadingHookResult } from "../types/fetching/LoadingHookResult";
import { apiService } from "../services/api-service/api-service";
import { getMessageOfCaughtError } from "../helpers/errors";

const useFetch = <TResult, TData>(
  config: RequestConfig<TData>,
  deps: unknown[]
): LoadingHookResult<TResult> => {
  const [data, setData] = useState<TResult | null>(null);
  const [error, setError] = useState<ErrorState>(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setData(null);
    try {
      const response = await apiService.sendRequest<TResult, TData>(config);
      setData(response);
      setError(false);
    } catch (e) {
      setError(getMessageOfCaughtError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [...deps]);

  return { data, error, loading };
};

export default useFetch;
