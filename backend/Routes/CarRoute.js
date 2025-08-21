import express from "express"
import multer from "multer"
import { AddCar, DeleteCar, EachCarDetails, EachOwnerCars, GetAllCars, UpdateCarDetails } from "../Controllers/CarController.js";
import {isAuthenticated }from "../Middleware/isAuthenticated.js";
import {isOwner} from "../Middleware/isOwner.js";
const router = express.Router()


// config multer
const storage = multer.memoryStorage();
const upload = multer({storage:storage})

// routes
router.post('/add-car',upload.single('image'),isAuthenticated,isOwner,AddCar)
router.get('/my-cars',isAuthenticated,isOwner,EachOwnerCars)
router.get("/all-cars",GetAllCars)
router.get('/car-details/:id',EachCarDetails)
router.put('/update-car-details/:id',upload.single('image'),isAuthenticated,isOwner,UpdateCarDetails)
router.delete('/delete-car/:id',isAuthenticated,isOwner,DeleteCar)


export default router