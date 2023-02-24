import { Router } from 'express';
import { SellerController } from '../controllers/users/seller';
import { hotelController } from '../controllers/users/hotel';
import { locationController } from '../controllers/users/locaton';
import { roomController } from '../controllers/users/room';



const MainRoute = Router();


MainRoute.use("/users", SellerController);
MainRoute.use("/hotels", hotelController);
MainRoute.use("/locations", locationController);
MainRoute.use("/rooms", roomController);

export default MainRoute;
