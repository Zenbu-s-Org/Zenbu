import { Button } from "@/components/ui";

type AddToCartBtnProps = {
    onConfirm: () => void;
    disabled?: boolean;
}

function AddToCartBtn({ onConfirm, disabled }: AddToCartBtnProps) {
  return (
    <Button variant="primary" onClick={onConfirm} disabled={disabled} className="my-4">+ add to cart</Button>
  )
}

export default AddToCartBtn