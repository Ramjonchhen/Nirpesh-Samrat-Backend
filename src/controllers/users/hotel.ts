import { Router } from "express";

import { AppDataSource } from "../../data-source";
import { Hotel, HotelRowStatus } from "../../entities/hotel";
import { SuccessMessage } from "../../response-output/sucess-messsage";
import { Seller } from "../../entities/seller";
import { Not } from "typeorm";
import { getLocationById } from "../../controllers/users/locaton"
import { RoomRowStatus } from "../../entities/room";

const hotelRepo = AppDataSource.getRepository(Hotel);
const sellerRepo = AppDataSource.getRepository(Seller);

export const hotelController = Router();

export async function getHotelById(id: string) {
  try {
    const hotel = await hotelRepo.findOne({
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

hotelController.get("/", async (req, res) => {
  try {
    return res.send(await hotelRepo.find({
      where: {
        status: Not(HotelRowStatus.HD),
      }, select: {
        name: true,
        id: true,
        address: true,
      }, relations: {
        location: true,
        seller: true,
      }
    }));
  } catch (error) {
    return res.status(405).send(error);
  }
})

hotelController.get("/rooms/:id", async (req, res) => {
  try {
    const hotelId = req.params?.id as string;
    const Hotel = await getHotelById(hotelId!);

    const hotelWithRooms = await hotelRepo.createQueryBuilder('hotel')
      .leftJoin("hotel.rooms", "room")
      .leftJoin("hotel.location","location")
      .select(
        [
          'hotel.id',
          'hotel.name',
          'hotel.address',
          'location.name',
          'room.id',
          'room.price',
          'room.images',
          'room.roomNo',
          'room.roomtype',
          'room.sceneryFacing',
          'room.rental',
          'room.ticketing',
          'room.balcony',
          'room.swimmingPool',
          'room.gym',
        ]
      )
      .where("hotel.id = :id", {
        id: hotelId,
      })
      .andWhere("hotel.status = :hotelRowStatus1", {
        hotelRowStatus1: HotelRowStatus.HC,
      })
      .orWhere("hotel.status = :hotelRowStatus2", {
        hotelRowStatus2: HotelRowStatus.HU,
      })
      .andWhere("room.status = :roomRowStatus1", {
        roomRowStatus1: RoomRowStatus.RC,
      })
      .orWhere("room.status = :roomRowStatus2", {
        roomRowStatus2: RoomRowStatus.RU,
      })
      .getMany();

    return res.send(
      hotelWithRooms
    );
  } catch (error) {
    return res.status(405).send(error);
  }
})

hotelController.post("/", async (req, res) => {
  try {
    const { name, address, locationId } = req.body;
    const newHotel = new Hotel();
    newHotel.name = name;
    newHotel.address = address;
    newHotel.seller = await sellerRepo.findOne({
      where: {
        id: '8905c986-a71b-469b-889f-4e4406b8d02a'
      }
    });
    const location = await getLocationById(locationId);
    console.log("location in hotel controller is: ", location);
    newHotel.location = location;
    console.log("new Hotel is: ", newHotel);
    hotelRepo.save(newHotel);
    const succeessRes = new SuccessMessage("Hotel added succesfully");
    res.send(succeessRes);
  } catch (error) {
    return res.status(405).send(error);
  }
})

hotelController.delete("/:id", async (req, res) => {
  try {
    const id = req.params?.id as string;
    const Hotel = await getHotelById(id!);
    hotelRepo.update({
      id
    }, {
      status: HotelRowStatus.HD,
    })
    const succeessRes = new SuccessMessage("Hotel Removed succesfully");
    res.send(succeessRes);
  } catch (error) {
    return res.status(405).send(error);
  }
})

hotelController.patch("/:id", async (req, res) => {
  try {
    const id = req.params?.id as string;
    const name = req.body.name as string;
    const address = req.body.address as string;
    const locationId = req.body.locationId as string;

    const Hotel = await getHotelById(id);
    if (name) Hotel.name = name;
    if (address) Hotel.address = address;
    if (locationId) {
      const location = await getLocationById(locationId);
      Hotel.location = location;
    } 
    console.log("hotel is: ",Hotel);
    // hotelRepo.update({
    //   id
    // }, {
    //   name,
    //   status: HotelRowStatus.HU,
    // })
    hotelRepo.save(Hotel);
    const succeessRes = new SuccessMessage("Hotel Updated succesfully");
    res.send(succeessRes);
  } catch (error) {
    return res.status(405).send(error);
  }
})