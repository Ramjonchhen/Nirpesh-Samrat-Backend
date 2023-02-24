import { Router } from "express";

import { AppDataSource } from "../../data-source";
import { Seller } from "../../entities/seller";



const sellerModel = AppDataSource.getRepository(Seller)

// export const seller = async(req:Request, res: Response) => {
//   try {
//     const sellerFromBody = req.body;
//     const sellerMap = sellerModel.create(sellerFromBody);
//     await sellerModel.save(sellerMap);
//   }
//   catch(e) {
//     return res.status(405).send(e);
//   }
// };

export const SellerController = Router();

SellerController.get("/", async (req, res) => {
  try {
    const sellerMap = await sellerModel.find();
    const data = await sellerModel.save(sellerMap);
    res.send(data);
  }
  catch (e) {
    return res.status(405).send(e);
  }
})

SellerController.post("/", async (req, res) => {
  // try {
  //   const {id,hotelName,username,location} = req.body;
  //   const newSeller = sellerModel.create({id,hotelName, username, location});
  //   const data = await sellerModel.save(newSeller);
  //   res.send(data);
  // }
  // catch (e) {
  //   return res.status(405).send(e);
  // }
})


SellerController.delete("/", async (req, res) => {
  try {
    const specificHotelname = await sellerModel.find({
      where:{
        id:req.body.id
      }
    });
    if(specificHotelname.length>1){
      await sellerModel.remove(specificHotelname)
    }
    return res.send({msg:"Hotel Deleted."});
  }
  catch (e) {
    return res.status(405).send(e);
  }
})

