
import { createContext, useContext } from "react"
import type { cartItem } from "../../types/CartItem";

interface CartContextType{
    cartItems: cartItem[];
    totalAmount: number;
    AddItemToCart: (productId: string) => void;
    updateItemInCart:(productId: string, quantity: number) => void;
    removeItemInCart:(productId:string) => void;
    clearCart:() => void
}
export const CartContext = createContext<CartContextType>({
     cartItems:[],
     totalAmount: 0,
     AddItemToCart: () => {}, 
     updateItemInCart: () => {}, 
     removeItemInCart: () =>{},
     clearCart: () => {}
 })

export const useCart = () => useContext(CartContext);