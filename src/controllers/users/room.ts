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
            }
        });
        if (!Room)
            throw { message: "Room with this id does not exist" }
        return Room;
    }
    catch (e) {
        throw {
            ...e
        }
    }
}

roomController.get("/", async (req, res) => {
    try {
        return res.send(await roomRepo.find({
            where: {
                status: Not(RoomRowStatus.RD),
            }, select: {
                id: true,
            }
            //, relations: {
            //     location: true,
            //     seller: true,
            // }
        }));
    } catch (error) {
        return res.status(405).send(error);
    }
})

roomController.get("/location/:location", async (req, res) => {
    try {
        const locationAddress = req.params.location;
        console.log("location address: ", locationAddress);
        
        const roomsOfLocation = await roomRepo.createQueryBuilder('room')
            .leftJoin('room.hotel', 'hotel')
            .leftJoin('hotel.location', 'location')
            .select(
                [
                    // 'hotel.id',
                    // 'hotel.name',
                    'room.id',
                    'room.price',
                    'room.images',
                    'room.roomNo',
                    'room.roomType',
                    'room.sceneryFacing',
                    'room.rental',
                    'room.ticketing',
                    'room.balcony',
                    'room.swimmingPool',
                    'room.gym',
                ]
            )
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
            .andWhere('location.name = :locationName', {
                locationName: locationAddress,
            })
            .getMany();
        return res.send(roomsOfLocation);
    } catch (error) {
        return res.status(405).send(error);
    }
})

roomController.post("/", async (req, res) => {
    try {
        const
            { price,
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
                hotelId }
                = req.body;
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
})

roomController.delete("/:id", async (req, res) => {
    try {
        const id = req.params?.id as string;
        const Room = await getRoomById(id!);
        roomRepo.update({
            id
        }, {
            status: RoomRowStatus.RD,
        })
        const succeessRes = new SuccessMessage("Room Removed succesfully");
        res.send(succeessRes);
    } catch (error) {
        return res.status(405).send(error);
    }
})

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
})