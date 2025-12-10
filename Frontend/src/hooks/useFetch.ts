import { useState, useEffect } from "react";

export function useFetch<T>(endpoint: string | null) {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // const BASE_URL = "https://zenbu-ajsi.onrender.com/api";
  const BASE_URL = "http://localhost:5050/api";
  const url = BASE_URL + endpoint;

  useEffect(() => {
    if (!url) {
      setData(undefined);
      setError(null);
      setLoading(false);
      return;
    }

    let ignore = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const json = (await res.json()) as T;
        if (!ignore) setData(json);
      } catch (err: unknown) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}
