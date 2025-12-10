type CartItemProps = {
  name: string;
  qty: number;
};

function CartItem({ name, qty }: CartItemProps) {
  return (
    <div className="flex w-full justify-between rounded-xl bg-stone-200 px-2 py-1 font-semibold">
      <span>{name}</span>
      <span>{`x${qty}`}</span>
    </div>
  );
}

export default CartItem;
