

function SignatureBowls() {
  return (
    <main className="pl-5">
        <h1 className="font-extrabold text-3xl mb-5">Signature Bowls</h1>
        <section className="w-[332px] h-[462px] border-2 rounded-xl p-2 flex flex-col justify-between mb-10">
            <img className="w-full h-full object-cover" src="/lax-bowl.png" alt="" />
            <section className="flex flex-col gap-3">
                <p className="font-bold text-2xl">Spicy Bowl</p>
                <p className="font-bold text-gray-500">spicy | vegan</p>
                <button className="border-3 rounded-xl px-2 py-1 font-bold bg-lime-300 border-lime-900 text-lime-900 w-full">+ Buy</button>
            </section>
            
        </section>
    </main>
  )
}

export default SignatureBowls