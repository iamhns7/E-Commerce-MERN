import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

const apiUrl = import.meta.env.VITE_API_URL;

const HomePage = () => {
  
  const[products, setProducts]= useState<Product[]>([])

useEffect(() => {
  const fetchDate = async () => {
      const response =await fetch(`${apiUrl}/product`);
      const data = await response.json();
      setProducts(data)
  }
  fetchDate();
  
  
}, []);


  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map(({_id, title, image, price}) => (
  <Grid item md={4} key={_id}>
    <ProductCard _id={_id} title={title} image={image} price={price}/>
  </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
