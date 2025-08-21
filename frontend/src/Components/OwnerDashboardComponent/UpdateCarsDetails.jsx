
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCarsDetails = () => {
    const [CarDetails, setCarDetails] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, watch } = useForm();
    const image = watch("image");
    const navigate = useNavigate()

    // Fetch car details
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/cars/car-details/${id}`,
                    { withCredentials: true }
                );
                if (response.data?.data) {
                    const car = response.data.data;
                    // Make sure ownerId is string
                    if (typeof car.ownerId === 'object') car.ownerId = car.ownerId._id;
                    setCarDetails(car);
                    // Populate form fields
                    setValue("Brand", car.Brand);
                    setValue("Model", car.Model);
                    setValue("Year", car.Year);
                    setValue("Dailyprice", car.Dailyprice);
                    setValue("Category", car.Category);
                    setValue("transmission", car.transmission);
                    setValue("fueltype", car.fueltype);
                    setValue("seatingcapacity", car.seatingcapacity);
                    setValue("location", car.location);
                    setValue("Description", car.Description);
                    setValue("status",car.status)
                }
            } catch (error) {
                console.log("Failed to get car details", error);
            }
        };
        fetchCarDetails();
    }, [id, setValue]);

    // Handle update
    const onSubmit = async (data) => {
        const formData = new FormData();
        for (let key in data) {
            if (key === "image" && data[key]?.[0]) {
                formData.append("image", data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        }
        for(let pair of formData.entries()){
            console.log(pair[0] + "," + pair[1])
        }
        try {
            setLoading(true);
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cars/update-car-details/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (response.data) {
                toast.success("Car details updated successfully!");
                 navigate("/owner-dashboard/manage-cars")
            }
        } catch (error) {
            console.log("Failed to update car details", error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };
    return (
        <div className="max-w-2xl mx-5 bg-white shadow-lg rounded-2xl border p-10 mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Car</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                {/* Upload Image */}
                <div className="flex flex-col gap-2">
                    {/* Preview */}
                    {image && image[0] ? (
                        <img
                            src={URL.createObjectURL(image[0])} // temporary preview
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded-lg"
                        />
                    ) : CarDetails?.image ? (
                        <img
                            src={CarDetails.image} // existing image from backend
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover rounded-lg"
                        />
                    ) : null}
                    <label className="block font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full border rounded-lg p-2"
                        {...register("image")}
                    />
                </div>
                {/* Other Fields */}
                {[
                    { label: "Brand", name: "Brand", type: "text", placeholder: "e.g. Hyundai" },
                    { label: "Model", name: "Model", type: "text", placeholder: "e.g. Creta" },
                    { label: "Year", name: "Year", type: "number", placeholder: "Enter year" },
                    { label: "Daily Price ($)", name: "Dailyprice", type: "number", placeholder: "Enter price per day" },
                    { label: "Seating Capacity", name: "seatingcapacity", type: "number", placeholder: "Enter seating capacity" },
                    { label: "Location", name: "location", type: "text", placeholder: "Enter location" },
                ].map((field) => (
                    <div key={field.name} className="flex flex-col gap-2">
                        <label className="block font-medium">{field.label}</label>
                        <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full border rounded-lg p-2"
                            {...register(field.name)}
                        />
                    </div>
                ))}

                {/* Select Fields */}
                <div className="flex flex-col gap-2">
                    <label className="block font-medium">Category</label>
                    <select {...register("Category")} className="w-full border rounded-lg p-2">
                        <option value="">Select Category</option>
                        <option value="Suv">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Van">Van</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="block font-medium">Transmission</label>
                    <select {...register("transmission")} className="w-full border rounded-lg p-2">
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="block font-medium">Status</label>
                    <select {...register("status")} className="w-full border rounded-lg p-2">
                        <option value="">Select status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="block font-medium">Fuel Type</label>
                    <select {...register("fueltype")} className="w-full border rounded-lg p-2">
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Cng">Cng</option>
                    </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="block font-medium">Description</label>
                    <textarea
                        {...register("Description")}
                        placeholder="Enter description"
                        rows={3}
                        className="w-full border rounded-lg p-2"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    {loading ? <Loader2 className="mx-auto animate-spin w-5 h-5" /> : "Update Car"}
                </button>
            </form>
        </div>
    );
};

export default UpdateCarsDetails;



