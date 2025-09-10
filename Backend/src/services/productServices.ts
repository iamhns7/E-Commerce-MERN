import productModel from "../models/productModel";

export const getAllProduct = async () => {
    return await productModel.find();
}

export const seedInitialProducts =  async() =>{
    try{
        const product = [
        {title: "Asus Laptop", image: "https://www.popsci.com/wp-content/uploads/2024/03/11/1J3A4860.jpg?quality=85", price: 800, stock: "1"},
        {title: "MSI Laptop", image: "https://cdn.vatanbilgisayar.com/Upload/PRODUCT/msi/thumb/thin-15-b12ve-1892xtr_large.jpg", price: 700, stock: "2"},
        {title: "Mac Laptop", image: "https://cdn.vatanbilgisayar.com/Upload/PRODUCT/asus/thumb/148677_large.jpg", price: 1100, stock: "3"}
        ];

         const existingProduct = await getAllProduct();

         if(existingProduct.length === 0){
         await productModel.insertMany(product)
    }
      }
      catch (err){
        console.log("Connot see database", err);
      }
  
}