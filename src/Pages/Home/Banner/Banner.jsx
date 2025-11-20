import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div>
      <Carousel interval={3000} infiniteLoop={true} autoPlay={true}>
        <div className="relative">
          <img src={bannerImg1} />

          {/* <button className="btn btn-primary text-black rounded-2xl  absolute  top-2/3 left-2/7 -translate-x-1/3 -translate-y-1/2">
            Track Your Parcel
          </button>
          <button className="btn text-black  border border-gray-600 btn-outline  absolute  top-2/3 left-2/4 -translate-x-1/3 -translate-y-1/2">
            Raider
          </button> */}
        </div>
        <div>
          <img src={bannerImg2} />
        </div>
        <div>
          <img src={bannerImg3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
