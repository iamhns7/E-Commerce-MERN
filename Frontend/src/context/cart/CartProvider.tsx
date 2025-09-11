import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { cartItem } from "../../types/CartItem";


const CartProvider: FC<PropsWithChildren> = ({children}) => {
   const [cartItems, setCartItems] = useState<cartItem[]>([]);
   const [totalAmount, setTotalAmount] = useState<number>(0);

   const AddItemToCart = (productId: string) => {
    console.log(productId)
   }
    

    return(
        <CartContext.Provider value={{cartItems, totalAmount, AddItemToCart}}>
            {children}
            </CartContext.Provider>
    )
    }

    export default CartProvider;