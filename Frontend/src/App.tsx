import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore.ts";
import router from "@/routes/AppRoutes";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Kolla auth status vid app start
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <RouterProvider router={router} />;
}

export default App;
