
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Star } from "lucide-react";
import { Autoplay } from "swiper/modules";

const testimonials = [
   {
    id: 1,
    name: "Rohit Malhotra",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "Booking a car was super quick and easy. I reserved my dream car in just a few minutes without any hassle!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sneha Patel",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "Amazing experience! The car was clean, well-maintained, and delivered right on time. Highly recommend this service.",
    rating: 5,
  },
  {
    id: 3,
    name: "Arjun Khanna",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    feedback:
      "I rented a luxury car for the weekend. The process was smooth, and the ride was unforgettable!",
    rating: 5,
  },
  {
    id: 4,
    name: "Meera Nair",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    feedback:
      "The prices were very reasonable compared to other platforms. I’ll definitely book again for my next trip.",
    rating: 4,
  },
  {
    id: 5,
    name: "Kabir Singh",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    feedback:
      "The entire process from booking to returning the car was seamless. Great support team as well!",
    rating: 5,
  },
];
const TestiMonils = () => {
  return (
     <section className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-white mb-12">
           What Our Customers Say
        </h2>
        <Swiper
         modules={[Autoplay]}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white  p-6 rounded-xl h-full flex flex-col  min-h-[200px] gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-[#012047]">
                      {t.name}
                    </h4>
                    <div className="flex gap-1 text-yellow-400">
                      {Array(t.rating)
                        .fill()
                        .map((_, i) => (
                          <Star key={i} fill="currentColor" className="w-4 h-4" />
                        ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#465D7C] text-sm font-[500]">{t.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestiMonils;
