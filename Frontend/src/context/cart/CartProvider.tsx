import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { cartItem } from "../../types/CartItem";
import { useAuth } from "../auth/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

const CartProvider: FC<PropsWithChildren> = ({children}) => {
   const {token} = useAuth();
   const [cartItems, setCartItems] = useState<cartItem[]>([]);
   const [totalAmount, setTotalAmount] = useState<number>(0);
   const [, setError] = useState<string | null>(null);


    useEffect(() => {
    if(!token){
        return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${apiUrl}/cart`,{
        headers: {
            'Authorization':`Bearer ${token}`
        }
      });
      if(!response.ok){
        setError('Failed to fetch user cart. Please try again')
      }
      const cart = await response.json();

         const cartItemsMapped = cart.items.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({product, quantity, unitPrice}: {product : any; quantity: number; unitPrice: number}) => ({
         productId: product._id,
         title: product.title,
         image: product.image,
         quantity,
         unitPrice}))
      setCartItems(cartItemsMapped)
      setTotalAmount(cart.totalAmount)
    }
    fetchCart();
  },[token])

  const AddItemToCart = async (productId: string) => {
  console.log("Token in addItemToCart:", token);
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
         if (!response.ok) {
        setError("Failed to add to cart");
      }

      const cart = await response.json();
       
      if (!cart) {
        setError("Failed to parse cart data");
      }

      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity }: { product: any; quantity: number; }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice: product.unitPrice,
        })
      );

        setCartItems([...cartItemsMapped]);
        setTotalAmount(cart.totalAmount)
    }
    catch (error){
        console.error(error)
    }
  
   }

   const updateItemInCart = async(productId: string, quantity: number ) => {
    
      try{
     const response = await fetch(`${apiUrl}/cart/items`,{
            method: "PUT",
            headers:{
              'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
          productId,
          quantity,
        }),
        })
         if (!response.ok) {
        setError("Failed to update to cart");
      }

      const cart = await response.json();
       
      if (!cart) {
        setError("Failed to parse cart data");
      }

      const cartItemsMapped = cart.items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity, unitPrice }: { product: any; quantity: number, unitPrice: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );

        setCartItems([...cartItemsMapped]);
        setTotalAmount(cart.totalAmount)
    }
    catch (error){
        console.error(error)
    }
   }
    
   const removeItemInCart = async (productId: string) => {
  try {
    const response = await fetch(`${apiUrl}/cart/items/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setError("Failed to delete from cart");
      return;
    }

    const cart = await response.json().catch(() => ({ items: [], totalAmount: 0 }));

    const cartItemsMapped = (cart.items || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ product, quantity, unitPrice }: { product: any; quantity: number, unitPrice: number }) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice,
      })
    );

    setCartItems(cartItemsMapped);
    setTotalAmount(cart.totalAmount || 0);
  } catch (error) {
    console.error(error);
  }
};

   const clearCart = async() => {
     try{
     const response = await fetch(`${apiUrl}/cart`, {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

         if (!response.ok) {
        setError("Failed to empty to cart");
      }

      const cart = await response.json();
       
      if (!cart) {
        setError("Failed to parse cart data");
      }


        setCartItems([]);
        setTotalAmount(0)
    }
    catch (error){
        console.error(error)
    }
   }

    return(
        <CartContext.Provider value={{cartItems, totalAmount, AddItemToCart, updateItemInCart, removeItemInCart, clearCart}}>
            {children}
            </CartContext.Provider>
    )
    }

    export default CartProvider; 

    