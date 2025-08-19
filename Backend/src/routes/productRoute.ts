import  express  from "express";
import { getAllProduct } from "../services/productServices";

const router = express.Router();
router.get('/', async(req, res) => {
    try{const product = await getAllProduct();
    res.status(200).send(product)}
     catch{
   res.status(500).send("Something went wrong!")
    }
    
    
})
export default router;
