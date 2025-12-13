import { useState, useEffect } from "react";
import { API_URL } from "@/config/apiConfig";

export function useFetch<T>(endpoint: string | null) {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!endpoint) {
      setData(undefined);
      setError(null);
      setLoading(false);
      return;
    }

    let ignore = false;

    const url = `${API_URL}${
      endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    }`;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          credentials: "include",
        });

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
  }, [endpoint]);

  return { data, loading, error, setData };
}
