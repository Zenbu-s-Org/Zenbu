import { Button } from "@/components/ui";
import { useCart } from "@/features/cart";
import imgPlaceholder from "../../../assets/imgPlaceholder.svg";

type MenuCardProps = {
  id: string;
  name: string;
  desc?: string;
  price: number;
  img?: string;
};

function MenuCard({ id, name, desc, price, img }: MenuCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id, name, price });
  };

  return (
    <article className="flex h-60 w-85 flex-col rounded-2xl border-2 border-stone-300 bg-stone-50 p-4">
      <div className="flex justify-between">
        <div className="min-w-0">
          <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold">
            {name}
          </h3>
          <p className="mt-3 mb-1 font-['Nunito'] text-sm uppercase">
            {price} sek
          </p>
          <p className="font-['Nunito'] text-sm">{desc}</p>
        </div>
        <div className="shrink-0">
          <img
            src={img || imgPlaceholder}
            alt={name}
            className="mt-4 h-24 h-auto w-24 w-26 object-cover"
            onError={(e) => (e.currentTarget.src = imgPlaceholder)}
          />
        </div>
      </div>
      <Button variant="primary" onClick={handleAddToCart} className="mt-auto">
        + add
      </Button>
    </article>
  );
}

export default MenuCard;
