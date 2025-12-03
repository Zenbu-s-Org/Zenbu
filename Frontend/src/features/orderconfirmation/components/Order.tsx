import React from 'react'

type orderprops = {
    title: string,
    qty: number
}

function Order({title, qty}:orderprops) {
  return (
    <>
    <section className='flex flex-col px-5'>
    <div className='flex flex-row justify-between font-bold'>
        <p>{title}</p>
        <p>{qty}x</p>
    </div>
    </section>
    </>
  )
}

export default Order