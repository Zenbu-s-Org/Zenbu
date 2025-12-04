type CartItemProps = {
    name: string,
    qty: number
}


function CartItem({name, qty}: CartItemProps) {
  return (
    <div className="flex w-full justify-between py-1 px-2 bg-stone-200 font-semibold rounded-xl">
        <span>{name}</span>
        <span>{`x${qty}`}</span>
    </div>
  )
}

export default CartItem