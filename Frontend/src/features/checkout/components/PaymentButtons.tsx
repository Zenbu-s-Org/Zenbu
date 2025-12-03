import { Button } from "@/components/ui"
import { useCheckout } from "../hooks/useCheckout"

// en hook för att kolla om en jwt är giltig eller ej? 


function PaymentButtons() {
  const {setCustomer, submitOrder, paymentMethod } = useCheckout()



  const userId = "" // user från hook här
  const isLoggedIn = false

  async function handlePurchase() {
    if(isLoggedIn) {
      setCustomer(userId)
    } else {
      setCustomer("guest")
    }
    submitOrder()
  }

  return (
    <>
    {isLoggedIn ? (
      <>
        <Button variant="submit" className="w-full" onClick={handlePurchase}> Go To Payment </Button>
       </> ) : (
        <>
          <h3 className="font-bold">Have an account?</h3>
          <div className="w-full flex flex-col items-center gap-2">
              <Button variant="link" className="w-full">Sign In</Button>
              <span className="font-bold text-lg">Or</span>
              {paymentMethod ? (<Button variant="submit" className="w-full" onClick={handlePurchase} >Continue as Guest</Button>) : (<p> Choose payment method to contiue</p>)}
              
          </div>
        </>  
)}
    </>
  )
}

export default PaymentButtons