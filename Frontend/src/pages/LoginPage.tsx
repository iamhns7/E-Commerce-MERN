import { Box, Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);

const navigate = useNavigate();

const {login} = useAuth()

 const onSubmit = async () => {
 
  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;
  //validate the form data
  if (!email || !password) {
    console.error("All fields are required");
    return;
  }

        console.log(email, password)
        const response = await fetch(`${apiUrl}/user/login`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             email, password
            })
        })
        const token = await response.json();

        login(email, token)
        navigate("/")
        console.log(token)
    }
  return (
    <Container>
        <Box sx={{
            display: "flex",
          flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 4, 
        }}>
            
      <Typography variant="h6">Login to your account</Typography>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 3,
        border: 1,
        padding: 2,
        borderColor: "#f5f5f5"

        }}>
            
            <TextField inputRef={emailRef} label="Email" name="email"/>
            <TextField inputRef={passwordRef} label="Password" type="password" name="password"/>
            <Button onClick={onSubmit}variant="contained">Login</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
