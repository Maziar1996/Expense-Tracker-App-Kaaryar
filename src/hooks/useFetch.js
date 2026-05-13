import { useState, useEffect, useCallback } from "react";

function useFetch(apiFunction, immediate = true) {
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await apiFunction(...params);

        setData(result);
        return result;
      } catch (error) {
        setError(error.message || "خطایی رخ داده است");
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, isLoading, error, execute };
}

export default useFetch;
