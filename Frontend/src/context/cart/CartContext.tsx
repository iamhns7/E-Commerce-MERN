
import { createContext, useContext } from "react"
import type { cartItem } from "../../types/CartItem";

interface CartContextType{
    cartItems: cartItem[];
    totalAmount: number;
    AddItemToCart: (productId: string) => void;
}
export const CartContext = createContext<CartContextType>({
     cartItems:[],
     totalAmount: 0,
     AddItemToCart: () => {}
 })

export const useCart = () => useContext(CartContext);