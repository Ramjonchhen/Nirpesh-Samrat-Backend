import { Router } from "express";

import { AppDataSource } from "../../data-source";
import { Room, RoomRowStatus } from "../../entities/room";
import { SuccessMessage } from "../../response-output/sucess-messsage";
import { Not } from "typeorm";
import { getHotelById } from "./hotel";
import { Hotel, HotelRowStatus } from "../../entities/hotel";

const roomRepo = AppDataSource.getRepository(Room);
const hotelRepo = AppDataSource.getRepository(Hotel);

export const roomController = Router();

export async function getRoomById(id: string) {
  try {
    const Room = await roomRepo.findOne({
      where: {
        id,
      },
    });
    if (!Room) throw { message: "Room with this id does not exist" };
    return Room;
  } catch (e) {
    throw {
      ...e,
    };
  }
}

roomController.get("/", async (req, res) => {
  try {
    return res.send(
      await roomRepo.find({
        where: {
          status: Not(RoomRowStatus.RD),
        },
        select: {
          id: true,
        },
        //, relations: {
        //     location: true,
        //     seller: true,
        // }
      })
    );
  } catch (error) {
    return res.status(405).send(error);
  }
});

async function getRoomByLocation(locationName) {
  const locationAddressObj = { locationName };
  return await roomRepo
    .createQueryBuilder("room")
    .leftJoin("room.hotel", "hotel")
    .leftJoin("hotel.location", "location")
    .select([
      "room.id",
      "room.price",
      "room.images",
      "room.roomNo",
      "room.roomType",
      "room.sceneryFacing",
      "room.rental",
      "room.ticketing",
      "room.balcony",
      "room.swimmingPool",
      "room.gym",
      "hotel.id",
      "hotel.name",
      "hotel.address",
    ])
    .where("hotel.status = :hotelRowStatus1", {
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
    .where("location.name = :locationName", locationAddressObj)
    .getMany();
}

roomController.get("/location/:location", async (req, res) => {
  try {
    const roomsOfLocation = await getRoomByLocation(req.params.location);
    return res.send(roomsOfLocation);
  } catch (error) {
    return res.status(405).send(error);
  }
});

async function getLocationByRoomId(roomId) {
  return await roomRepo
    .createQueryBuilder("room")
    .leftJoin("room.hotel", "hotel")
    .leftJoin("hotel.location", "location")
    .select(["room.id", "location.name"])
    .where("room.id = :roomId", {
      roomId,
    })
    .getRawMany();
}

async function getDataSetForSimilarity(roomId, location) {
  const locationAddressObj = { location };
  return await roomRepo
    .createQueryBuilder("room")
    .leftJoin("room.hotel", "hotel")
    .leftJoin("hotel.location", "location")
    .select([
      "room.id",
      "room.price",
      "room.images",
      "room.roomNo",
      "room.roomType",
      "room.sceneryFacing",
      "room.rental",
      "room.ticketing",
      "room.balcony",
      "room.swimmingPool",
      "room.gym",
      "room.noOfBed",
    ])
    .where("room.id != :roomId", {
      roomId,
    })
    .andWhere("location.name = :location", locationAddressObj)
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
}

function findSimilarRooms(original, dataSetArray, threshold) {
  const orgScenryFacing = +original.sceneryFacing;
  const orgRental = +original.rental;
  const orgTicketing = +original.ticketing;
  const orgBalcony = +original.balcony;
  const orgSwimmingPool = +original.swimmingPool;
  const orgGym = +original.gym;
  const orgNoOfBed = original.noOfBed;

  console.log("original data is: ", "sceneryFacing: ", orgScenryFacing);

  const originalMag = Math.sqrt(
    Math.pow(orgScenryFacing, 2) +
      Math.pow(orgTicketing, 2) +
      Math.pow(orgBalcony, 2) +
      Math.pow(orgSwimmingPool, 2) +
      Math.pow(orgGym, 2) +
      Math.pow(orgNoOfBed, 2)
  );

  console.log("oringal magnitude is: ", originalMag);

  for (let i = 0; i < dataSetArray.length; i++) {
    const dataSetScenryFacing = +dataSetArray[i].sceneryFacing;
    console.log("data set scenery facing is: ", dataSetScenryFacing);
    const dataSetRental = +dataSetArray[i].rental;
    console.log("data set rental is: ", dataSetRental);
    const dataSetTicketing = +dataSetArray[i].ticketing;
    console.log("data set ticketing is: ", dataSetTicketing);
    const dataSetBalcony = +dataSetArray[i].balcony;
    console.log("data set balcony is: ", dataSetBalcony);
    const dataSetSwimmingPool = +dataSetArray[i].swimmingPool;
    console.log("data set swimming pool is: ", dataSetSwimmingPool);
    const dataSetGym = +dataSetArray[i].gym;
    console.log("data set gym is: ", dataSetGym);
    const dataSetNoOfBed = dataSetArray[i].noOfBed;
    console.log("data set nof of bed is: ", dataSetNoOfBed);

    const dotProduct =
      orgScenryFacing * dataSetScenryFacing +
      orgRental * dataSetRental +
      orgTicketing * dataSetTicketing +
      orgBalcony * dataSetBalcony +
      orgSwimmingPool * dataSetSwimmingPool +
      orgGym * dataSetGym +
      orgNoOfBed * dataSetNoOfBed;

    const dataSetMag = Math.sqrt(
      Math.pow(dataSetScenryFacing, 2) +
        Math.pow(dataSetTicketing, 2) +
        Math.pow(dataSetBalcony, 2) +
        Math.pow(dataSetSwimmingPool, 2) +
        Math.pow(dataSetGym, 2) +
        Math.pow(dataSetNoOfBed, 2)
    );
    console.log("data set magnitude: ", dataSetMag);
    console.log("dot product is: ", dotProduct);
    const denominator = originalMag * dataSetMag;
    const cosine = dotProduct / denominator;
    console.log("cosine of the i value is: ", i, " cosine: ", cosine);
    dataSetArray[i].cosine = cosine;
  }
  console.log("dat set array length is: ", dataSetArray.length);

  const similarRoomArray = dataSetArray.filter(
    (room) => room.cosine > threshold
  );
  console.log("similar rooms filtered is: ", similarRoomArray.length);
  const sortedSimilarRooms = similarRoomArray.sort(function(a,b) { return a - b;});
  console.log("sorted similar rooms: ",sortedSimilarRooms);
  return sortedSimilarRooms;
}

roomController.get("/findSuggestions/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    // checking whether the roomid is valid or not
    const room = await getRoomById(roomId);
    // finding location of the room if valid
    const roomLocationArray = await getLocationByRoomId(room.id);
    // validation of location left
    const roomLocation = roomLocationArray[0].location_name;
    // finding similar rooms of the room of same location except the room to find similarity
    const similarityDataSet = await getDataSetForSimilarity(
      room.id,
      roomLocation
    );
    // console.log("original room: ", room);
    console.log("data set: ", similarityDataSet);
    const similarRooms = findSimilarRooms(room, similarityDataSet, 0.9);
    return res.send(similarRooms);
  } catch (error) {
    return res.status(405).send(error);
  }
});

roomController.post("/", async (req, res) => {
  try {
    const {
      price,
      image,
      roomNo,
      roomType,
      sceneryFacing,
      rental,
      ticketing,
      balcony,
      swimmingPool,
      noOfBed,
      gym,
      hotelId,
    } = req.body;
    const hotel = await getHotelById(hotelId);

    const newRoom = new Room();
    newRoom.price = price;
    newRoom.images = image;
    newRoom.roomNo = roomNo;
    newRoom.roomtype = roomType;
    newRoom.sceneryFacing = sceneryFacing;
    newRoom.rental = rental;
    newRoom.ticketing = ticketing;
    newRoom.balcony = balcony;
    newRoom.swimmingPool = swimmingPool;
    newRoom.noOfBed = noOfBed;
    newRoom.gym = gym;
    newRoom.hotel = hotel;
    roomRepo.save(newRoom);
    const succeessRes = new SuccessMessage("Room added succesfully");
    res.send(succeessRes);
  } catch (error) {
    return res.status(405).send(error);
  }
});

roomController.post("/bulkUpload", async (req, res) => {
  console.log("bulk upload hit");
  try {
    const { blukArray } = req.body;
    for (let i = 0; i < blukArray.length; i++) {
      const {
        price,
        image,
        roomNo,
        roomType,
        sceneryFacing,
        rental,
        ticketing,
        balcony,
        swimmingPool,
        noOfBed,
        gym,
        hotelId,
      } = blukArray[i];

      const hotel = await getHotelById(hotelId);
      console.log("hotel in bulk upload is: ", hotel);
      const newRoom = new Room();
      newRoom.price = price;
      newRoom.images = image;
      newRoom.roomNo = roomNo;
      newRoom.roomtype = roomType;
      newRoom.sceneryFacing = sceneryFacing;
      newRoom.rental = rental;
      newRoom.ticketing = ticketing;
      newRoom.balcony = balcony;
      newRoom.swimmingPool = swimmingPool;
      newRoom.noOfBed = noOfBed;
      newRoom.gym = gym;
      newRoom.hotel = hotel;
      console.log("new room is: ", newRoom);
      roomRepo.save(newRoom);
    }
    const succeessRes = new SuccessMessage("Bulk Room Upload Successful");
    res.send(succeessRes);
  } catch (error) {
    return res.status(405).send(error);
  }
});

roomController.delete("/:id", async (req, res) => {
  try {
    const id = req.params?.id as string;
    const Room = await getRoomById(id!);
    roomRepo.update(
      {
        id,
      },
      {
        status: RoomRowStatus.RD,
      }
    );
    const succeessRes = new SuccessMessage("Room Removed succesfully");
    res.send(succeessRes);
  } catch (error) {
    return res.status(405).send(error);
  }
});

roomController.patch("/:id", async (req, res) => {
  try {
    const id = req.params?.id as string;
    const name = req.body.name as string;
    const address = req.body.address as string;

    const Room = await getRoomById(id);
    // if (name) Room.name = name;
    // if (address) Room.address = address;

    roomRepo.save(Room);
    const succeessRes = new SuccessMessage("Room Updated succesfully");
    res.send(succeessRes);
  } catch (error) {
    return res.status(405).send(error);
  }
});
