import  express, { request, response }  from "express";
import { getMyOrders, login, register } from "../services/userServices";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequests";

const router = express.Router();

router.post('/register',async(request, response) =>{
    try{const {firstName, lastName, email, password} = request.body;
    const {statusCode, data} = await register({firstName, lastName, email, password});
    response.status(statusCode).json(data)}
     catch{
     response.status(500).send("Something went wrong!")
    }
    
})
router.post('/login', async(request, response) =>{
    try{const {email, password} = request.body;
    const {statusCode, data} =  await login({email, password})
    response.status(statusCode).json(data)}
      catch{
     response.status(500).send("Something went wrong!")
    }
})

router.get('/my-orders',validateJWT, async(request: ExtendRequest, response) => {
      try{
      const userId = request.user._id;
      const {statusCode, data} = await getMyOrders({userId})
      response.status(statusCode).send(data);
    }
      catch(err){
        response.status(500).send("Something went wrong!")
           }
    
})

export default router;