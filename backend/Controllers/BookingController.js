import User from "../Models/UserModel.js";
import { Response } from "../utils/ResponseHandler.js";
import Cars from "../Models/CarsModel.js";
import Booking from "../Models/BookingModel.js";
import Owner from "../Models/OwnerModel.js";

// user booking functions
export const BookCar = async (req, res) => {
  try {
    const userId = req.user;
    const { pickupdate, returndate, carId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 400, "user not found or you are not authorized to book car ");
    }
    if (user.role === "Owner") {
      return Response(res, 400, "You are not authorized to book car");
    }
    const car = await Cars.findById(carId);
    if (!car) {
      return Response(res, "400", "car not found");
    }
    // Check if already booked before creating
    const alreadyBooking = await Booking.findOne({ userId, carId,$or:[{
      pickupdate:{$lte:returndate},// old pick <= new return
      returndate:{$gte:pickupdate} // old return <= new pick
    }] });
    if (alreadyBooking) {
      return Response(res, 400, "Car already Booked by You overlapping dates");
    }
    //  calculate total booking price
    const pickup = new Date(pickupdate);
    const returnD = new Date(returndate);

    const diffTime = Math.abs(returnD - pickup);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalprice = days * car.Dailyprice;
    const Bookingcar = await Booking.create({
      userId: userId,
      carId,
      pickupdate,
      returndate,
      totalprice: totalprice,
    });
    user.mybookings.push(Bookingcar._id);
    await user.save();
    return Response(res, 200, "Booking successfull", Bookingcar);
  } catch (error) {
    console.log("failed to book car", error);
    return Response(res, 500, "internal server error");
  }
};
export const EachUserBookings = async (req, res) => {
  try {
    const userId = req.user;
    console.log("userid", userId);
    const user = await User.findById(userId);
    if (!user || user.role !== "Renter") {
      return Response(res, 400, "only Users can fetch this data");
    }
    const bookings = await Booking.find({ userId }).populate(
      "carId",
      "Brand Model Year fueltype Dailyprice Category transmission seatingcapacity location Description image"
    );
    if (!bookings) {
      return Response(res, 400, "No bookings found");
    }
    return Response(res, 200, "Bookings", bookings);
  } catch (error) {
    console.log("failed to get bookings", error);
    return Response(res, 500, "internal server error");
  }
};

// owner booking functions
export const GetOwnerBookings = async (req, res) => {
  try {
    const ownerId = req.user;
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return Response(res, 400, "Owner not found");
    }
    //  get all cars of owner
    const ownerCars = await Cars.find({ ownerId: ownerId }).select("_id");
    if (!ownerCars.length) {
      return Response(res, 400, "No cars found for this owner");
    }

    const carIds = ownerCars.map((car) => car._id);
    // get bookings of these car
    const bookings = await Booking.find({ carId: { $in: carIds } })
      .populate("userId", "name email profilepic")
      .populate("carId", "Brand Model Year Dailyprice image")
      .select("pickupdate returndate status totalprice");
    if (!bookings.length) {
      return Response(res, 400, "No bookings found");
    }
    return Response(res, 200, "bookings", bookings);
  } catch (error) {
    console.log("failed to get bookings", error);
    return Response(res, 500, "internal server error");
  }
};

export const UpdateBookingstatus = async (req, res) => {
  try {
    const ownerId = req.user;
    const bookingid = req.params.id;
    const { status } = req.body;

    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return Response(res, 400, "Owner not found");
    }
    const booking = await Booking.findById(bookingid).populate("carId");
    if (!booking) {
      return Response(res, 400, "Booking not found");
    }

    // Check if this booking belongs to the owner's car
    if (booking.carId.ownerId.toString() !== ownerId.toString()) {
      return Response(
        res,
        403,
        "You are not authorized to update this booking"
      );
    }

    booking.status = status;
    await booking.save();
    return Response(res, 200, "Status update successfully", booking);
  } catch (error) {
    console.log("failed to update booking status", error);
    return Response(res, 500, "internal server error");
  }
};

 export const FindTotalRevenue = async(req,res)=>{
  try {
    const ownerId = req.user
    const owner = await Owner.findById(ownerId)
       if (!owner) {
      return Response(res, 400, "Owner not found");
    }
     // Get all cars of owner
    const ownerCars = await Cars.find({ ownerId: ownerId }).select("_id");
    if (!ownerCars.length) {
      return Response(res, 200, "No cars found for this owner", { totalRevenue: 0,totalBookings:0 });
    }
    const carIds =  ownerCars.map((car)=>car._id)
     // Get confirmed bookings of these cars
    const bookings = await Booking.find({
      carId: { $in: carIds },
      status: "Confirmed" // only confirmed bookings
    }).select("totalprice");
    // Calculate total revenue
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalprice, 0);
    const totalBookings = bookings.length
    // console.log ("total revenue",totalRevenue)
    //  console.log ("Bookings",totalBookings)
    return Response(res, 200, "Total revenue fetched successfully", { totalRevenue,totalBookings });
  } catch (error) {
    console.log("failed to get owner revenue", error);
    return Response(res, 500, "internal server error");
  }
}
