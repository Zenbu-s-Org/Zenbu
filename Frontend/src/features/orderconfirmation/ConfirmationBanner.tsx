import React from 'react'
import { cn } from 'clsx-for-tailwind'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { useState,useEffect } from 'react'




function ConfirmationBanner() {
    const [toggle, setToggle] = useState<boolean>(false)
     const [qty, setQty] = useState<string>("")
     const [status, setStatus] = useState<string>("")
    const [orderId, setOrderId] = useState<string | null>()
    //hämta ordern från localstorage
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
    }
    fetchData()
    },[])
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
        {!orderId && <p className='text-center'>There is no order</p>} 
        {toggle && 
         <section className='flex flex-col px-5'>
            <section className='flex flex-row justify-between'>
            <p>Spicy bowl</p>
            <p>{qty}</p>
            </section>
        </section>
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