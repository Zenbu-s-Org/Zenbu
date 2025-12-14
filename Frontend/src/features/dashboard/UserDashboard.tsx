import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import StatsCard from "./components/StatsCard";
import OrderHistory from "./components/OrderHistory";
import ChangeDetailsForm from "./components/ChangeDetailsForm";
import type { Stats, BackendOrder, FormattedOrder } from "./Types";
import { API_URL } from "@/config/apiConfig";

function UserDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const navigate = useNavigate();

  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<FormattedOrder[]>([]);
  const [showAllOrders, setShowAllOrders] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const userId = user.id;

      // Hämta stats (cookie skickas automatiskt)
      const statsRes = await fetch(`${API_URL}/order/stats/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!statsRes.ok) {
        if (statsRes.status === 401) {
          navigate("/login");
          return;
        }
        throw new Error("Failed to fetch stats");
      }

      const statsData: Stats = await statsRes.json();
      setStats(statsData);

      // Hämta orders (cookie skickas automatiskt)
      const ordersRes = await fetch(`${API_URL}/order/user/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!ordersRes.ok) {
        if (ordersRes.status === 401) {
          navigate("/login");
          return;
        }
        throw new Error("Failed to fetch orders");
      }

      const ordersData: BackendOrder[] = await ordersRes.json();

      // Formatera orders för UI
      const formattedOrders: FormattedOrder[] = ordersData.map((order) => ({
        id: order._id,
        orderNumber: order.orderNumber,
        items: order.items.map((item) => item.name).join(", "),
        price: order.totalPrice,
        status: order.status,
      }));

      setOrders(formattedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Error fetching dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    // Vänta tills auth är klar med att checka
    if (authLoading) return;

    // Om inte inloggad, redirect till login
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    // Om inloggad, hämta dashboard data
    fetchDashboardData();
  }, [isAuthenticated, user, authLoading, navigate, fetchDashboardData]);

  useEffect(() => {
    // Polling: uppdatera dashboard data var 5:e minut
    if (!isAuthenticated || !user) return;

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 300000);

    return () => clearInterval(interval);
  }, [isAuthenticated, user, fetchDashboardData]);

  // Visa loading medan auth checkas
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600 mb-2">Error</p>
          <p className="text-stone-600">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-8">
      <div className="px-4 pt-6 pb-4 justify-center text-center">
        <h1 className="text-3xl font-bold mb-1">
          Welcome back, {user?.name || "Guest"}!
        </h1>
        <p className="text-stone-600">Manage your orders and preferences</p>
      </div>

      <div className="px-4 mb-20 flex gap-4 justify-center">
        <StatsCard
          label="Total Orders"
          value={stats?.totalOrders || 0}
          variant="primary"
        />
        <StatsCard
          label="Amount Spent"
          value={`${stats?.amountSpent || 0} SEK`}
          variant="green"
        />
      </div>

      <div className="px-4 mb-20">
        <OrderHistory
          orders={orders}
          showAll={showAllOrders}
          setShowAll={setShowAllOrders}
        />
      </div>

      <div className="px-4 mb-20">
        <ChangeDetailsForm
          userName={user?.name || ""}
          userEmail={user?.email || ""}
        />
      </div>
    </div>
  );
}

export default UserDashboard;
