import React, { use } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCart from "./ReviewCart";

const Revews = ({ revewsDataJson }) => {
  const data = use(revewsDataJson);
  //   console.log(data);
  return (
    <div>
      <div className="text-center">
        <h2 className=" text-3xl">Review</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
          sequi libero distinctio voluptas? Placeat consequatur rem similique
          ipsam, beatae, amet, iste esse quidem voluptatibus saepe officiis
          architecto? Labore, inventore amet!
        </p>
      </div>
      <div className="mt-8">
        <>
          <Swiper
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {data.map((card) => (
              <SwiperSlide>
                <ReviewCart key={card.id} card={card}></ReviewCart>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default Revews;
