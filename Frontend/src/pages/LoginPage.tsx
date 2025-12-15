import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button, Input } from "../components/ui";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/menu");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-stone-100">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-6 p-6"
      >
        <h1 className="mb-4 text-center text-4xl font-bold">Sign In</h1>

        {error && (
          <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <Input
          label="E-mail"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="submit"
          className="w-full"
          disabled={isLoading} // ✅ NYTT - Disable under loading
        >
          {isLoading ? "Signing in..." : "Sign In"}{" "}
          {/* ✅ NYTT - Dynamic text */}
        </Button>

        <div className="mt-4 text-center">
          <p className="mb-2 font-bold">Don't have an account?</p>
          <Button
            variant="link"
            className="w-full"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
