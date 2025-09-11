import  Container  from "@mui/material/Container"
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const {token} = useAuth();
  const [cart, setcart] = useState();
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
      const data = await response.json();
      setcart(data)
    }
    fetchCart();
  },[token])

  console.log({cart})
  return(
   <Container sx={{ mt: 2 }}>
    <Typography variant="h4">My Cart</Typography>
    </Container>
  ) 
}

export default CartPage;