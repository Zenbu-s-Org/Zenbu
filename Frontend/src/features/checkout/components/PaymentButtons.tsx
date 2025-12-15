import { Button } from "@/components/ui";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../hooks/useCheckout";

type PaymentButtonProps = {
  onGuestContinue: () => void;
}

function PaymentButtons({ onGuestContinue }: PaymentButtonProps) {
  const { paymentMethod } = useCheckout();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!paymentMethod) {
    return <p>Choose payment method to continue</p>;
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Button variant="submit" className="w-full" onClick={onGuestContinue}>
            Continue
          </Button>
        </>
      ) : (
        <>
          <h3 className="font-bold">Have an account?</h3>
          <div className="flex w-full flex-col items-center gap-2">
            <Button
              variant="link"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <span className="text-lg font-bold">Or</span>

            <Button
              variant="submit"
              className="w-full"
              onClick={onGuestContinue}
            >
              Continue as Guest
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default PaymentButtons;
