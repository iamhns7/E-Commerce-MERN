import Container from "@mui/material/Container"
import { Typography, Button, Box, TextField } from "@mui/material";
import { useCart } from "../context/cart/CartContext";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";


const apiUrl = import.meta.env.VITE_API_URL;


const CheckOutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const {token} = useAuth();

  const addressRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleConfirmOrder =async () => {
    const address = addressRef.current?.value; 
    
    if(!address)
      return;

        const response = await fetch(`${apiUrl}/cart/checkout`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
            address,
            })
        })

        if(!response.ok)
           return; 

        navigate('/order-success')
  }

  const renderCartItem = () => (
    <Box display="flex" flexDirection="column" gap={2}  sx={{
            border: 2,
            borderColor: "#f5f5f5",
            borderRadius: 5,
            padding: 1,
          }}>
      {cartItems.map((item) => (
        <Box
          key={item.productId}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
         
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={1}  width="100%">
            <img src={item.image} width={120} />
            <Box display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%">
              <Typography variant="h6">{item.title}</Typography>
              <Typography>
                {item.quantity} x {item.unitPrice.toFixed(2)} $
              </Typography>
              
            </Box>
          </Box>
         
        </Box>
      ))}
      <Box>
        <Typography variant="body2" sx={{textAlign: "right" }}>Total Amount = {totalAmount} $</Typography>
        
      </Box>
    </Box>
  );

  return (
    <Container fixed sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2}}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Checkout</Typography>
        
      </Box>
    <TextField inputRef={addressRef} label="Delivery Address & Customer Info" name="address" fullWidth/>
      {renderCartItem()} 
      <Button variant="contained" fullWidth sx={{   fontSize: 18}} onClick={handleConfirmOrder}> Pay </Button>
      </Container>
  );
};

export default CheckOutPage;
