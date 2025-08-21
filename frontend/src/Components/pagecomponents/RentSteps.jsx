import React from 'react'
import { Search, Calendar, ClipboardCheck, KeyRound } from "lucide-react";




const RentSteps = () => {
  

      const steps = [
    {
      id: 1,
      title: "Browse our fleet",
      desc: "Explore our selection of luxury and exotic cars online. Filter by brand, model, and availability to find the perfect vehicle for your experience.",
      icon: <Search className="w-6 h-6 text-white" />,
    },
    {
      id: 2,
      title: "Select your car and dates",
      desc: "Once you’ve found the car you want, choose your rental dates and review the details, including pricing and any special requirements.",
      icon: <Calendar className="w-6 h-6 text-white" />,
    },
    {
      id: 3,
      title: "Complete your booking",
      desc: "Fill out a simple reservation form with your personal information, driver’s license details, and insurance preferences. Secure your booking instantly.",
      icon: <ClipboardCheck className="w-6 h-6 text-white" />,
    },
    {
      id: 4,
      title: "Pick up your car",
      desc: "On your scheduled date, collect your car from the location or opt for delivery. Enjoy your ride hassle-free!",
      icon: <KeyRound className="w-6 h-6 text-white" />,
    },
  ];
  return (
    <section className="px-[2vw] sm:px-[4vw] py-16 w-full bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 
 className="text-[2rem] md:text-[2.8rem] font-[700] text-center mb-16">
      Rent your dream car in <span className="text-blue-600">4 steps</span>
    </h2>

    <div className="relative">
      {/* vertical line - only show on md+ */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-blue-200"></div>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="mb-12 flex flex-col md:flex-row justify-between items-center w-full gap-6"
        >
          {/* left side */}
          <div
            className={`w-full flex flex-col gap-4 md:w-5/12 ${
              index % 2 === 0 ? "md:text-right" : "md:invisible"
            }`}
          >
            <h3 className="text-xl md:text-[2rem] font-semibold text-gray-900 text-center md:text-inherit">
              {step.title}
            </h3>
            <p className="mt-2 text-[#767676] text-[1rem] font-[500] text-center md:text-[#767676]">
              {step.desc}
            </p>
          </div>

          {/* center icon (hidden on mobile) */}
          <div className="hidden md:block relative z-10">
            <div className="flex items-center justify-center w-20 h-20 bg-[#094EEE] rounded-full shadow-md">
              {step.icon}
            </div>
          </div>

          {/* right side */}
          <div
            className={`w-full flex flex-col gap-5 md:w-5/12 ${
              index % 2 !== 0 ? "md:text-left" : "md:invisible"
            }`}
          >
            <h3 className="text-xl md:text-[2rem] font-semibold text-gray-900 text-center md:text-inherit">
              {step.title}
            </h3>
        <p className="mt-2 text-[#767676] text-[1rem] font-[500] text-center md:text-[#767676]">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  )
}

export default RentSteps