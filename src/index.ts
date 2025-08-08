import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import { seedInitialProducts } from "./services/productServices";
import productRoute from "./routes/productRoute";


const app = express();
const port = 3003;

app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log("faild to connect", err));


seedInitialProducts();


//for can read product image at productServices
app.use(express.static("public"));

app.use('/user',userRoutes);
app.use("/product", productRoute)

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`)
})
 