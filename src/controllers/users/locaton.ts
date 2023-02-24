import { Router } from "express";

import { AppDataSource } from "../../data-source";
import { Location, LocationRowStatus } from "../../entities/location";
import { SuccessMessage } from "../../response-output/sucess-messsage";
import { Seller } from "../../entities/seller";
import { Not } from "typeorm";

const locationRepo = AppDataSource.getRepository(Location);
const sellerRepo = AppDataSource.getRepository(Seller);

export const locationController = Router();

async function getLocationById(id: string) {
    try {
        const location = await locationRepo.findOne({
            where: {
                id,
            }
        });
        console.log("location is: ", location);
        if (!location)
            throw { message: "location with this id does not exist" }
        return location;
    }
    catch (e) {
        throw {
            ...e
        }
    }
}

locationController.get("/", async (req, res) => {
    try {
        return res.send(await locationRepo.find({
            where: {
                status: Not(LocationRowStatus.LD),
            }, select: {
                name: true,
                id: true,
            }
        }));
    } catch (error) {
        return res.status(405).send(error);
    }
})

locationController.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const newLocation = new Location();
        newLocation.name = name;
        newLocation.seller = await sellerRepo.findOne({
            where: {
                id: '8905c986-a71b-469b-889f-4e4406b8d02a'
            }
        })
        console.log("new location is: ", newLocation);
        locationRepo.save(newLocation);
        const succeessRes = new SuccessMessage("Location added succesfully");
        res.send(succeessRes);
    } catch (error) {
        return res.status(405).send(error);
    }
})

locationController.delete("/:id", async (req, res) => {
    try {
        const id = req.params?.id as string;
        const location = await getLocationById(id!);
        locationRepo.update({
            id
        }, {
            status: LocationRowStatus.LD,
        })
        const succeessRes = new SuccessMessage("Location Removed succesfully");
        res.send(succeessRes);
    } catch (error) {
        return res.status(405).send(error);
    }
})

locationController.patch("/:id", async (req, res) => {
    try {
        const id = req.params?.id as string;
        const { name } = req.body;
        const location = await getLocationById(id!);
        locationRepo.update({
            id
        }, {
            name,
            status: LocationRowStatus.LU,
        })
        const succeessRes = new SuccessMessage("Location Updated succesfully");
        res.send(succeessRes);
    } catch (error) {
        return res.status(405).send(error);
    }
})