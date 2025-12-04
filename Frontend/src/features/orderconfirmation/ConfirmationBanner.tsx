
import { cn } from 'clsx-for-tailwind'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { useState,useEffect,} from 'react'
import Order from './components/Order'
type itemprops = {
        menuItem: string,
        quantity: number
    }
function ConfirmationBanner() {
    const [toggle, setToggle] = useState<boolean>(false)
    const [items, setItems] = useState<itemprops[]>([])
    const [status, setStatus] = useState<string>("")
    const [orderId, setOrderId] = useState<string | null>()

    useEffect(() => {
        const id = localStorage.getItem("orderId")
        setOrderId(id)
    },[])

    useEffect(() => {
        async function fetchData(){
        if (!orderId) return
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${orderId}`)
            if(!res.ok){
                console.log("order not found")
                return;
            }
            

            const order = await res.json()
            console.log(order)
            console.log("ORDER:", order)
            console.log("ITEMS:", order.items)
            setItems(order.items)
            setStatus(order.status)
        } catch (error) {
            console.error("error", error)
        }
    }
    fetchData()
    },[orderId])

 
    

  return (
    <main className={cn("w-[300px] text-[#7C2D12] absolute top-15 z-10",
        {"bg-orange-300": status === "pending"},
        {"bg-fuchsia-300": status === "preparing",},
        {"bg-lime-300": status === "ready",}
    )}>
        <section className='flex flex-col items-center pt-2'>
            <h2 className='border-b text-2xl'>Your order</h2>
            <p className='text-[12px] font-bold'>Order: {orderId}</p>
            <p className='font-bold'>Status: {status}</p>
        </section>

        {/* {!orderId && <p className='text-center'>There is no order</p>}  */}

        {toggle && 
           items.map((e,i) => (
                    <Order key={i} title={e.menuItem} qty={e.quantity}/>
            ))
        }
        
            
        <section className='relative bottom-0 flex flex-col items-center pb-1'>
            {toggle ? 
            <>
            <button onClick={() => setToggle(false)} ><ChevronUp/></button>
            </>
            : 
            <>
            <button onClick={() => setToggle(true)}><ChevronDown/></button>
            </>
            }
              
        </section>
    </main>
  )
}

export default ConfirmationBanner