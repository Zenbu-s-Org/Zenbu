import { API_URL } from "@/config/apiConfig";
import { useEffect, useState, useCallback } from "react";

export function useFetch<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    try {
      setLoading(true);
      const res = await fetch(API_URL + endpoint, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Fetch failed");

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}
