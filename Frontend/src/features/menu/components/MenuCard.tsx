import { Button } from "@/components/ui";
import { useCart } from "@/features/cart";
import imgNotFound from "../../../assets/img-not-found.png"

type MenuCardProps = {
    id: string;
    name: string;
    description?: string;
    price: number;
}

function MenuCard({ id, name, description, price }: MenuCardProps) {
    const {addItem} = useCart()
    
    const handleAddToCart = () => {
        addItem({ id, name, price });
    };

  return (
    <article className="bg-stone-50 border-2 border-stone-300 rounded-2xl w-85 h-60 flex flex-col p-4">
      <div className="flex justify-between">
        <div className="min-w-0">
          <h3 className="font-['Bricolage_Grotesque'] font-bold text-xl">{name}</h3>
          <p className="font-['Nunito'] mt-3 mb-1 text-sm uppercase">{price} sek</p>
          <p className="font-['Nunito'] text-sm">{description}</p>
        </div>
        <div className="flex-shrink-0">
          <img src={imgNotFound || imgNotFound} alt={name} className="w-24 h-24 rounded-full object-cover mt-4 border-1 border-stone-300"></img>
        </div>
      </div>
      <Button variant="primary" onClick={handleAddToCart} className="mt-auto">+ add</Button>
    </article>
  )
}

export default MenuCard