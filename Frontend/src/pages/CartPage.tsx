import  Container  from "@mui/material/Container"
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { useCart } from "../context/cart/CartContext";
import { Box } from "@mui/system";

const apiUrl = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const {token} = useAuth();
  const {cartItems, totalAmount} = useCart()
  const [, setError] = useState<string | null>(null);



  
  return(
   <Container sx={{ mt: 2 }}>
    <Typography variant="h4">My Cart</Typography>
    {cartItems.map((item) => (
      <Box>
        {item.title}
      </Box>
    ))}
    </Container>
  ) 
}

export default CartPage;