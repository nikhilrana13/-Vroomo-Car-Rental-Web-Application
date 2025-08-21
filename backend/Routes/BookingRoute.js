import express from "express"
import { isAuthenticated } from "../Middleware/isAuthenticated.js"
import { BookCar,EachUserBookings, GetOwnerBookings, UpdateBookingstatus,FindTotalRevenue } from "../Controllers/BookingController.js"
import { isOwner } from "../Middleware/isOwner.js"
const router = express.Router()


// routes
// user booking routes
router.post("/book-car",isAuthenticated,BookCar)
router.get("/my-bookings",isAuthenticated,EachUserBookings)
// owner booking routes
router.get("/owner/total-revenue",isAuthenticated,isOwner,FindTotalRevenue)
router.get("/owner/my-bookings",isAuthenticated,isOwner,GetOwnerBookings)
router.put("/owner/update-booking-status/:id",isAuthenticated,isOwner,UpdateBookingstatus)



export default router 