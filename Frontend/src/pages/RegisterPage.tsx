import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Input } from "../components/ui"

function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-white flex items-start justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 w-full max-w-sm">
        <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
        
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
        
        <Button type="submit" variant="submit" className="w-full">
          Create Profile
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