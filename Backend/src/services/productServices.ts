import productModel from "../models/productModel";

export const getAllProduct = async () => {
    return await productModel.find();
}

export const seedInitialProducts =  async() =>{
    try{
        const product = [
        {title: "Asus Laptop", image: "/img/laptop1.jpg", price: 800, stock: "1"},
        {title: "Nike Krampon", image: "/img/Krampon.webp", price: 800, stock: "10"},];

         const existingProduct = await getAllProduct();

         if(existingProduct.length === 0){
         await productModel.insertMany(product)
    }
      }
      catch (err){
        console.log("Connot see database", err);
      }
  
}