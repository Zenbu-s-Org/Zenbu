import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore" 
import { Button, Input } from "../components/ui"

function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login) 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("") 
  const [isLoading, setIsLoading] = useState(false) 

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") 

    
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true) 

    
    try {
      await login(email, password)
      navigate("/menu") 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setIsLoading(false) 
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-start justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center mb-4">Sign In</h1>
        
       
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
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
          {isLoading ? "Signing in..." : "Sign In"} {/* ✅ NYTT - Dynamic text */}
        </Button>
        
        <div className="text-center mt-4">
          <p className="font-bold mb-2">Don't have an account?</p>
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
  )
}

export default LoginPage