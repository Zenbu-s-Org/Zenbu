import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore" 
import { Button, Input } from "../components/ui"

function RegisterPage() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register) 
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState("") 
  const [isLoading, setIsLoading] = useState(false) 

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") 

    
    if (!name || !email || !password || !repeatPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true) 

   
    try {
      await register(name, email, password)
      navigate("/menu")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false) 
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-start justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
        
       
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <Input
          label="Your Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
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
        
        <Input
          label="Repeat"
          type="password"
          placeholder="Repeat your password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        
        <Button 
          type="submit" 
          variant="submit" 
          className="w-full"
          disabled={isLoading} 
        >
          {isLoading ? "Creating account..." : "Create Profile"} 
        </Button>
        
        <div className="text-center mt-4">
          <p className="font-bold mb-2">Have an account?</p>
          <Button 
            variant="link" 
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage