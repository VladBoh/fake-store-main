import { CartProducts } from "@/components/cart/cart-product"

export const CartPage = () => {
    return (
        <div className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            <h1>Your Cart</h1>
            <CartProducts/>
        </div>
    )
}
