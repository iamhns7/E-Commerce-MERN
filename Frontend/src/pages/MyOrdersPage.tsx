import Container from "@mui/material/Container";

import { useAuth } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";


const MyOrdersPage = () => {
    const { getMyOrders, myOrders} = useAuth();

    useEffect(() => {
          getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
   // console.log(myOrders)


   return  <Container 
   fixed 
   sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", gap: 2}}
   >
    <Typography>My Orders</Typography>
    {myOrders.map(({ address, orderItems, total}, index) => (
       <Box key={index} sx={{
        border: 1,
        borderColor: "gray",
        borderRadius: 2,
        padding: 1
       }} > 
        <Typography>Address: {address}</Typography>
        <Typography>Items: {orderItems.length}</Typography>
        <Typography>Total: {total}</Typography>
       </Box>
    ))}
    </Container>;
}

export default MyOrdersPage;