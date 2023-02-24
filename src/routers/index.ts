import { Router } from 'express';
import { SellerController } from '../controllers/users/seller';
import { hotelRoomController } from '../controllers/users/hotel';
import { locationController } from '../controllers/users/locaton';


const MainRoute = Router();


MainRoute.use("/users", SellerController);
MainRoute.use("/hotel", hotelRoomController);
MainRoute.use("/locations", locationController);


export default MainRoute;
