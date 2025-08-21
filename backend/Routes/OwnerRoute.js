import express from "express"
const router = express.Router()
import multer from "multer";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { isOwner } from "../Middleware/isOwner.js";
import { UpdateOwnerProfile } from "../Controllers/OwnerController.js";


// config multer
const storage = multer.memoryStorage();
const upload = multer({storage:storage})

// routes 
router.put("/update-owner-profile",upload.single('profilepic'),isAuthenticated,isOwner,UpdateOwnerProfile)


export default router