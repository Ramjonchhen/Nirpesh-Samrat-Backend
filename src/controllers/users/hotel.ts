import { Router } from "express";
import { AppDataSource } from "../../data-source";
import { SuccessMessage } from "../../response-output/sucess-messsage";
import { Hotel } from "../../entities/hotel";


const hotelModel = AppDataSource.getRepository(Hotel)


export const hotelRoomController = Router();

hotelRoomController.get("/", async (req, res) => {
  try {
    const hotelRoomMap = await hotelModel.find();
    const data = await hotelModel.save(hotelRoomMap);
    res.send(data);
  }
  catch (e) {
    return res.status(405).send(e);
  }
})

hotelRoomController.post("/", async (req, res) => {
  try {
    const entities = req.body;
    console.log(entities);
    const newHotel = hotelModel.create(entities);
    await hotelModel.save(newHotel);
    const succeessRes = new SuccessMessage("Hotel added succesfully");
    res.send(succeessRes);
  }
  catch (e) {
    return res.status(405).send(e);
  }
})

async function getHotelById(id: string) {
  try {
    const hotel = await hotelModel.find({
      where: {
        id,
      }
    });
    if (!hotel)
      throw { message: "hotel with this id does not exist" }
    return hotel;
  }
  catch (e) {
    throw {
      ...e
    }
  }
}

hotelRoomController.delete("/", async (req, res) => {
  try {
    const hotel = await getHotelById(req.body.id);
    hotelModel.remove(hotel);
    const succeessRes = new SuccessMessage("Hotel removed succesfully");
    res.send(succeessRes);
  } catch (e) {
    return res.status(405).send(e);
  }

})