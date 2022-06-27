import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

const useFetch = <D>(config: AxiosRequestConfig<D>, deps: any[]) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios(config);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return { data, error, loading };
};

export default useFetch;
