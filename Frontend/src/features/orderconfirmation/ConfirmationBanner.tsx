
import { cn } from 'clsx-for-tailwind'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { useState,useEffect,} from 'react'
import Order from './components/Order'
import { useFetch } from '@/hooks/useFetch'

type ItemProps = {
  orderId: string;
  status: "pending" | "preparing" | "ready";
  items: {
    name: string;
    qty: number;
    id: string;
    price: number;
  }[];
     }

function ConfirmationBanner() {
  const [toggle, setToggle] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(localStorage.getItem("currentOrder"));
  }, []);

  const { data, loading } = useFetch<ItemProps>(
    orderId ? `/order/${orderId}` : null 
  );

  if (!orderId) return null; 
  if (loading || !data) return null; 

  

  return (
    <div
      className={cn("w-full text-orange-900 fixed top-15 z-10", {
        "bg-orange-300": data.status === "pending",
        "bg-fuchsia-300": data.status === "preparing",
        "bg-lime-300": data.status === "ready",
      })}
    >

      <section className="flex flex-col items-center pt-2 font-bold">
        <h2 className="border-b text-lg">Your order</h2>
        <p className="text-sm">Order: {orderId}</p>
        <p className="text-sm">Status: {data.status}</p>
      </section>

      {toggle &&
        data.items.map((item, i) => (
          <Order key={i} title={item.name} qty={item.qty} />
        ))}
                      <section className="flex flex-col items-center pb-1">
        <button onClick={() => setToggle(!toggle)}>
          {toggle ? <ChevronUp /> : <ChevronDown />}
        </button>
      </section>

    </div>
  );
}

export default ConfirmationBanner;