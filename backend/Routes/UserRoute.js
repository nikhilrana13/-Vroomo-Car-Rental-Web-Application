import express from "express"
const router = express.Router()
import multer from "multer"
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { GetUserProfile, UpdateUserProfile } from "../Controllers/UserController.js";



// config multer
const storage = multer.memoryStorage();
const upload = multer({storage:storage})

// routes
router.get("/profile",isAuthenticated,GetUserProfile)
router.put("/update-profile",upload.single("profilepic"),isAuthenticated,UpdateUserProfile)

export default router

