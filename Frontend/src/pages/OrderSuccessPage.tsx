import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";


const OrderSuccessPage = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/')
         
    }

   return  <Container 
   fixed 
   sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", gap: 2}}
   >
    <CheckCircleOutline sx={{color: 'green', fontSize: "160px"}} />
    <Typography variant="h4">Thanks for your order.</Typography>
    <Typography>We started processing it and we will get back to you soon.</Typography>
    <Button variant="contained" onClick={handleHome} >Go to home</Button>
    </Container>;
}

export default OrderSuccessPage;