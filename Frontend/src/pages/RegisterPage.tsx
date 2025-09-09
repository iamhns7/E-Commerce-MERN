import { Box, Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { useAuth } from "../context/auth/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
const firstNameRef = useRef<HTMLInputElement>(null);
const lastNameRef = useRef<HTMLInputElement>(null);
const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);

const {login} = useAuth()

 const onSubmit = async () => {
  const firstName = firstNameRef.current?.value;
  const lastName = lastNameRef.current?.value;
  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;
  //validate the form data
  if (!firstName || !lastName || !email || !password) {
    console.error("All fields are required");
    return;
  }

        console.log(firstName,lastName, email, password)
        const response = await fetch(`${apiUrl}/user/register`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName, lastName, email, password
            })
        })
        const token = await response.json();

        login(email, token)
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
            
      <Typography variant="h6">Register new account</Typography>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 3,
        border: 1,
        padding: 2,
        borderColor: "#f5f5f5"

        }}>
            
            <TextField inputRef={firstNameRef}label="First Name" name="firstName"/>
            <TextField inputRef={lastNameRef}label="Last Name" name="lastName"/>
            <TextField inputRef={emailRef} label="Email" name="email"/>
            <TextField inputRef={passwordRef} label="Password" type="password" name="password"/>
            <Button onClick={onSubmit}variant="contained">Register</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
