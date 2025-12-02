import { Button } from "@/components/ui"
import { useState } from "react"



// en hook för att kolla om en jwt är giltig eller ej? 


function PaymentButtons({}) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  return (
    <>
    {isLoggedIn ? (
      <>
        <Button variant="submit" className="w-full"> Go To Payment </Button>
       </> ) : (
        <>
          <h3 className="font-bold">Have an account?</h3>
          <div className="w-full flex flex-col items-center gap-2">
              <Button variant="link" className="w-full">Sign In</Button>
              <span className="font-bold text-lg">Or</span>
              <Button variant="submit" className="w-full">Continue as Guest</Button>
          </div>
        </>  
)}
    </>
  )
}

export default PaymentButtons