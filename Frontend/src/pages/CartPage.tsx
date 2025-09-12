import  Container  from "@mui/material/Container"
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCart } from "../context/cart/CartContext";
import { Box } from "@mui/system";

const CartPage = () => {
 
  const {cartItems, totalAmount} = useCart()
  



  
  return(
   <Container fixed sx={{ mt: 2 }}>
    <Typography variant="h4">My Cart</Typography>
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
       <Button>Remove item</Button>
       </Box>
       </Box>
         <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button>-</Button>
          <Button>+</Button>
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