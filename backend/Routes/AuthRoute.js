import express from "express"
import { Login, Logout, SignUp } from "../Controllers/AuthController.js"
const router = express.Router()


router.post('/sign-up',SignUp)
router.post('/login',Login)
router.get('/log-out',Logout)

export default router