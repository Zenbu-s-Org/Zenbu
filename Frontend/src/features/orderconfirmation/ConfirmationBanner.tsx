
import { cn } from 'clsx-for-tailwind'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { useState,useEffect, use } from 'react'
import Order from './components/Order'

function ConfirmationBanner() {
    const [toggle, setToggle] = useState<boolean>(false)
    const [qty, setQty] = useState<string>("")
    const [item, setItem] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [orderId, setOrderId] = useState<string | null>()
   
    useEffect(() => {
        const id = localStorage.getItem("orderId")
        setOrderId(id)
        
    },[])

    useEffect(() => {
        async function fetchData(){
        const res = await fetch(`http://localhost:5000/api/orders`)
        const orders = await res.json()
        setQty(orders[0].items[0].quantity)
        setStatus(orders[0].status)
        setItem("Spicy Bowl")
        
    }
    fetchData()
    },[])


    //mockDATA 
    type mockprops = {
        item: string,
        qty: number
    }
    const ordereditems:mockprops[] = [
        {item: "Sweet bowl", qty: 2},
        {item: "Spicy bowl", qty: 1},
        {item: "Vegan bowl", qty: 4},
    ]

  return (
    <main className={cn("w-[300px] text-[#7C2D12]",
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
           ordereditems.map((e,i) => (
                    <Order key={i} title={e.item} qty={e.qty}/>
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