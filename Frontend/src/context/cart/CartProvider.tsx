import { useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { cartItem } from "../../types/CartItem";
import { useAuth } from "../auth/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

const CartProvider: FC<PropsWithChildren> = ({children}) => {
   const {token} = useAuth();
   const [cartItems, setCartItems] = useState<cartItem[]>([]);
   const [totalAmount, setTotalAmount] = useState<number>(0);

   const AddItemToCart = async (productId: string) => {
    try{
     const response = await fetch(`${apiUrl}/cart/items`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
             productId,
             quantity: 1
            })
        })
        
        const cart = await response.json();

       const cartItemsMapped = cart.items.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({product, quantity}: {product : any; quantity: number}) => ({
         productId: product._id,
         title: product.title,
         image: product.image,
         quantity,
         unitPrice: product.unitPrice}))
        setCartItems([...cartItemsMapped]);
        setTotalAmount(cart.totalAmount)
    }
    catch (error){
        console.error(error)
    }
  
   }
    

    return(
        <CartContext.Provider value={{cartItems, totalAmount, AddItemToCart}}>
            {children}
            </CartContext.Provider>
    )
    }

    export default CartProvider;