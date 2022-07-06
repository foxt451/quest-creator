import { useState, useEffect } from "react";
import { ErrorState } from "../types/fetching/ErrorState";
import { RequestConfig } from "../types/fetching/RequestConfig";
import { apiService } from "../services/api-service/api-service";
import { errorMessages } from "../constants/messages";

const useFetch = <TResult, TData>(
  config: RequestConfig<TData>,
  deps: unknown[]
) => {
  const [data, setData] = useState<TResult>();
  const [error, setError] = useState<ErrorState>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await apiService.sendRequest<TResult, TData>(config);
      setData(response);
      setError(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setError(errorMessages.default);
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
