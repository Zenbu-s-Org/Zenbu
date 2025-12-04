import { useState, useEffect } from "react"


export function useFetch<T>(endpoint: string,) {
    const [data, setData] = useState<T | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const BASE_URL = "http://localhost:5050/api";
    const url = BASE_URL + endpoint

    useEffect(() => {
        if (!url) return
        async function fetchData() {
          try {
              setLoading(true)
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`)

            const json = (await res.json()) as T
            setData(json)

          } catch (error: unknown) {
            if(error instanceof Error) {
                setError(error.message)
            } else {
                console.log("Unexpected error:", error)
            }
          } finally {
            setLoading(false)
          }        
        }
        fetchData()
    }, [url])
        
        return { data, loading, error}
}
