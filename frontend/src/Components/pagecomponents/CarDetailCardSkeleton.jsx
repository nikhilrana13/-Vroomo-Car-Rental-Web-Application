import React from "react";
import { useLocation } from "react-router-dom";

const CarDetailCardSkeleton = () => {
  const location = useLocation()
  return (
    <div className={`relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg ${location.pathname === "/find-cars" ? "md:w-[320px]":"md:w-96"} w-full animate-pulse`}>
      {/* Title */}
      <div className="h-6 bg-gray-200 rounded-md w-32 m-4"></div>

      {/* Image */}
      <div className={`relative  ${location.pathname === "/find-cars" ? "h-56":"h-80"} m-2.5 overflow-hidden rounded-md bg-gray-200`}></div>
      {/* Icons */}
      <div className="p-4 flex gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-14 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Description */}
      <div className="px-4">
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-10/12"></div>
        <div className="h-4 bg-gray-200 rounded w-8/12"></div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex justify-between items-center mt-4">
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
        <div className="h-9 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default CarDetailCardSkeleton;
