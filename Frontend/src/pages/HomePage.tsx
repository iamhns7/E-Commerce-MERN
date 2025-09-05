import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

const HomePage = () => {
  const[products, setproducts]= useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:3003/product").then(async (response) => {
      const data = await response.json();
      setproducts(data)
    });
  },[])
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map(({_id, title, image, price}) => (
  <Grid item md={4} key={_id}>
    <ProductCard id={_id} title={title} image={image} price={price}/>
  </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
