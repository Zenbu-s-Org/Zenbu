import { useState, useEffect } from "react"
import { type MenuItem } from "@/types/types";

function useMenuItems() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMenu() {
            try {
                setLoading(true);
                const res = await fetch('http://localhost:5001/api/menu');
                if(!res.ok) throw new Error("Failed to fetch menu");
                const data: MenuItem[] = await res.json();
                setMenuItems(data);
            } catch (error: unknown) {
                if (error instanceof Error) setError(error.message); 
            } finally {
                setLoading(false);
            }
        }
        fetchMenu();
    }, []);

  return { menuItems, loading, error };
}

export default useMenuItems