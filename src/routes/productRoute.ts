import  express  from "express";
import { getAllProduct } from "../services/productServices";

const router = express.Router();
router.get('/', async(req, res) => {
    const product = await getAllProduct();
    res.status(200).send(product)
})
export default router;
