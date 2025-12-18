import { useEffect, useState, useCallback } from "react";
import { getAuthHeaders } from "@/config/apiConfig";
export function useFetch<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    try {
      setLoading(true);
      const res = await fetch(`api/${endpoint}`, {
        credentials: "include",
        headers: getAuthHeaders(),
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
