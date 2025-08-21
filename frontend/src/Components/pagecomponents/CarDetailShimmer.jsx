import React from "react";
import { useLocation } from "react-router-dom";

const CarDetailShimmer = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col md:flex-row gap-8 w-full animate-pulse">
      {/* left side */}
      <div className={`flex md:w-[70%] flex-col gap-4`}>
        <div className="w-full h-[500px] bg-gray-300 rounded-md"></div>
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <hr className="my-3" />

        <div className="flex flex-col md:flex-row gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex p-5 rounded-md flex-col items-center bg-gray-200 gap-3 w-full md:w-[200px] justify-center"
            >
              <div className="h-10 w-10 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-[90%] bg-gray-200 rounded"></div>
          <div className="h-4 w-[80%] bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* right side */}
      <div className="bg-white shadow-md w-full h-[480px] md:w-[30%] rounded-md p-5 flex flex-col gap-3 border">
        <div className="flex justify-between">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
        <hr className="my-4" />

        <div className="py-5 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="h-12 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-48 bg-gray-200 rounded mx-auto mt-5"></div>
      </div>
    </div>
  );
};

export default CarDetailShimmer;
