import express from "express";
import mongoose from "mongoose";
import { userModel } from "./models/userModel";
import userRoutes from "./routes/userRoutes";


const app = express();
const port = 3003;

app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("mongo connected"))
  .catch((err) => console.log("faild to connect", err));

  app.use('/user',userRoutes)

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`)
})
 