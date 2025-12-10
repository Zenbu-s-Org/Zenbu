import { Button } from "@/components/ui";
import { useCheckout } from "../hooks/useCheckout";

function PaymentButtons() {
  const { setCustomer, submitOrder, paymentMethod } = useCheckout();

  const userId = ""; // user från hook här
  const isLoggedIn = false;

  async function handlePurchase() {
    if (isLoggedIn) {
      setCustomer(userId);
    } else {
      setCustomer("guest");
    }
    submitOrder();
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <Button variant="submit" className="w-full" onClick={handlePurchase}>
            Go To Payment
          </Button>
        </>
      ) : (
        <>
          <h3 className="font-bold">Have an account?</h3>
          <div className="flex w-full flex-col items-center gap-2">
            <Button variant="link" className="w-full">
              Sign In
            </Button>
            <span className="text-lg font-bold">Or</span>

            {paymentMethod ? (
              <Button
                variant="submit"
                className="w-full"
                onClick={handlePurchase}
              >
                Continue as Guest
              </Button>
            ) : (
              <p>Choose payment method to continue</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default PaymentButtons;
