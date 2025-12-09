export type Ingredient = {
    id: string,
    name: string
}

export type Product = {
    name: string, 
    id: string,
    price: number,
    qty: number,
    ingredients: Ingredient[]
}

export type Order = {
    orderNumber: string,
    customer: string,
    status: string,
    totalPrice: number,
    createdAt: string
    paymentMethod?: string
    items: Product[],

}