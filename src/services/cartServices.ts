import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0, status: "active" });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface addItemToCart{
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async({productId, quantity, userId}: addItemToCart) => {
  const cart = await getActiveCartForUser({userId});

  const existsInCart = cart.items.find((p) => p.product.toString() === productId);

  if(existsInCart){
    return{
      data: "Item already exists in cart", statusCode: 400
    }
  }
   // Fetch the product
    const product = await productModel.findById(productId);

    if(!product){
      return{
        data: "Product not found", statusCode: 400
      }
    }
   
    if(product.stock < quantity){
      return{
        data: "Low stock for item", statusCode: 400
      }
    }

    cart.items.push({ product: productId, unitPrice: product.price, quantity})

    
    cart.totalAmount += product.price * quantity;

    const updateCart = await cart.save();
    return{
      data: updateCart,statusCode: 200
    }
}