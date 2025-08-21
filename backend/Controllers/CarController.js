import sharp from "sharp";
import Cars from "../Models/CarsModel.js";
import { Response } from "../utils/ResponseHandler.js";
import cloudinary from "../Config/Cloudinary.js";
import Owner from "../Models/OwnerModel.js";

export const AddCar = async (req, res) => {
  try {
    const userId = req.user;
    let owner = await Owner.findById(userId);
    if (!owner) {
      return Response(res, 400, "Owner not found");
    }
    const {
      Brand,
      Model,
      Year,
      Dailyprice,
      Category,
      transmission,
      fueltype,
      seatingcapacity,
      location,
      Description,
    } = req.body;
    // console.log("req.body",req.body)
    if (
      !Brand ||
      !Model ||
      !Year ||
      !Dailyprice ||
      !Category ||
      !transmission ||
      !fueltype ||
      !seatingcapacity ||
      !location ||
      !Description
    ) {
      return Response(res, 400, "All fields are required");
    }
    if (!req.file) {
      return Response(res, 400, "Please upload a image");
    }
    // optimize the image
    const optimizedImage = await sharp(req.file.buffer)
      .resize({ width: 500, height: 400 })
      .toFormat("jpeg")
      .toBuffer();
    const imagebase64 = `data:image/jpeg;base64,${optimizedImage.toString(
      "base64"
    )}`;
    // upload to cloudinary
    const cloudresponse = await cloudinary.uploader.upload(imagebase64, {
      folder: "car-images-vroomo",
      resource_type: "image",
    });
    // get the secure url of the uploaded image
    const imageurl = cloudresponse.secure_url;
    const car = await Cars.create({
      ownerId: userId,
      Brand,
      Year,
      Model,
      Dailyprice,
      Category,
      transmission,
      fueltype,
      seatingcapacity,
      location,
      Description,
      image: imageurl,
    });
    owner.mycars.push(car._id);
    await owner.save();
    return Response(res, 200, "Car added successfully", car);
  } catch (error) {
    console.log("failed to add car", error);
    return Response(res, 500, "Internal server error");
  }
};

export const GetAllCars = async (req, res) => {
  try {
    const AllCars = await Cars.find().populate(
      "ownerId",
      "username email profilepic"
    );
    if (!AllCars) {
      return Response(res, 400, "No Cars found");
    }
    return Response(res, 200, "Cars found", AllCars);
  } catch (error) {
    console.log("failed to get cars", error);
    return Response(res, 500, "Internal server error");
  }
};

export const EachOwnerCars = async (req, res) => {
  try {
    const OwnerId = req.user;
    const ownerCars = await Cars.find({ownerId:OwnerId})
  
    if (!ownerCars || ownerCars.length === 0) {
      return Response(res, 400, "No cars found");
    }
    return Response(res, 200, "Cars found successfully", ownerCars);
  } catch (error) {
    console.log("failed to get cars", error);
    return Response(res, 500, "Internal server error");
  }
};

export const EachCarDetails = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Cars.findById(carId)
      .populate("ownerId","username profilepic email")
    if (!car) {
      return Response(res, 400, "No details found");
    }
    return Response(res, 200, "Details found successfully", car);
  } catch (error) {
    console.log("failed to get details", error);
    return Response(res, 500, "Internal server error");
  }
};

export const UpdateCarDetails = async (req, res) => {
  try {
    const carId = req.params.id;
    const ownerId = req.user;
    const {
      Brand,
      Model,
      Year,
      Dailyprice,
      Category,
      transmission,
      fueltype,
      seatingcapacity,
      location,
      Description,
      status
    } = req.body;
    const file = req.file;

    const Existingcar = await Cars.findById(carId);

    if (Existingcar.ownerId.toString() !== ownerId) {
      return Response(res, 400, "You are not authorized to update this car");
    }

    if (!Existingcar) {
      return Response(res, 400, "Car not found");
    }
    let imageurl = Existingcar.image;
    if (file) {
      const optimizedImage = await sharp(file.buffer)
        .resize({ width: 500, height: 400 })
        .toFormat("jpeg")
        .toBuffer();
      const imagebase64 = `data:image/jpeg;base64,${optimizedImage.toString(
        "base64"
      )}`;
      // upload to cloudinary
      const cloudresponse = await cloudinary.uploader.upload(imagebase64, {
        folder: "car-images-vroomo",
        resource_type: "image",
      });
      // get the secure url of the uploaded image
      imageurl = cloudresponse.secure_url;
    }
    const updatedCar = await Cars.findByIdAndUpdate(
      carId,
      {
        Brand,
        Model,
        Year,
        Dailyprice,
        Category,
        transmission,
        fueltype,
        seatingcapacity,
        location,
        Description,
        image: imageurl,
        status
      },
      { new: true }
    );
    return Response(res, 200, "Car updated successfully", updatedCar);
  } catch (error) {
    console.log("failed to update details", error);
    return Response(res, 500, "Internal server error");
  }
};

export const DeleteCar = async (req, res) => {
  try {
    const ownerId = req.user;
    const carId = req.params.id;
    const car = await Cars.findById(carId);
    if (!car) {
      return Response(res, 400, "Car not found");
    }
    if (car.ownerId.toString() !== ownerId) {
      return Response(res, 400, "You are not authorized to delete this car");
    }
    const deletedCar = await Cars.findByIdAndDelete(carId);
    const owner = await Owner.findByIdAndUpdate(
      ownerId,
      { $pull: { mycars: carId } },
      { new: true }
    );
    return Response(res, 200, "Car deleted successfully", deletedCar);
  } catch (error) {
    console.log("failed to delete car", error);
    return Response(res, 500, "Internal server error");
  }
};
