import  Container  from "@mui/material/Container"
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCart } from "../context/cart/CartContext";
import { Box } from "@mui/system";

const CartPage = () => {
 
  const {cartItems, totalAmount, updateItemInCart, removeItemInCart, clearCart} = useCart()
  
  const handleQuantity = (productId: string, quantity: number) => {
    if(quantity <= 0){
      return
    }
    updateItemInCart(productId, quantity)
  }
 
  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId)
  }

  
  
  return(
   <Container fixed sx={{ mt: 2 }}>
    <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{
      mb: 2
    }}>
      <Typography variant="h4">My Cart</Typography>
      <Button onClick={() => clearCart()} >Clear Cart</Button>
   </Box>
    <Box display='flex' flexDirection='column' gap={3} >
    {cartItems.map((item) => (
      <Box display= "flex" flexDirection= 'row' justifyContent= 'space-between' alignItems= 'center' sx={{
        border: 2,
        borderColor: '#f5f5f5',
        borderRadius: 5,
        padding: 1
      }} >
        <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
       <img src={item.image} width={120}/>
       <Box>
       <Typography variant="h6"> {item.title}</Typography>
       <Typography> {item.quantity} x {item.unitPrice.toFixed(2)} $</Typography>
       <Button onClick={() => handleRemoveItem(item.productId)} >Remove item</Button>
       </Box>
       </Box>
         <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={() => handleQuantity(item.productId, item.quantity-1)} >-</Button>
          <Button onClick={() => handleQuantity(item.productId, item.quantity+1)} >+</Button>
        </ButtonGroup>
        
      </Box>
    ))}
    <Box>
      <Typography variant="h4" > Total Amount= {totalAmount} $</Typography>
      </Box>
    </Box>
    </Container>
  ) 
}

export default CartPage;