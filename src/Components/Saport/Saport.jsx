import React from "react";
import liveParsel from "../../assets/live-tracking.png";
import delivary from "../../assets/tiny-deliveryman.png";
import suportt from "../../assets/safe-delivery.png";
const suport = [
  {
    id: 1,
    image: <img src={liveParsel} alt="" />,
    title: "Live Parcel Tracking",
    Description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipments journey and get instant status updates for complete peace of mind.",
  },
  {
    id: 2,
    image: <img src={delivary} alt="" />,
    title: "100% Safe Delivery",
    Description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    id: 3,
    image: <img src={suportt} alt="" />,
    title: "24/7 Call Center Support",
    Description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];
const Saport = () => {
  return (
    <div>
      <div className="mt-6">
        {suport.map((data) => (
          <div
            key={data.id}
            className="md:flex gap-5 justify-center items-center"
          >
            <div>
              <p className="mt-7 md:w-[300px] md:h-[250px] mb-6 p-5">
                {data.image}
              </p>
            </div>
            <div className=" text-orange-500  md:border-1 h-30 border-dashed text-center items-center"></div>
            <div
              className="
           flex justify-center flex-col gap-3 "
            >
              <h2 className="font-bold text-3xl text-secondary">
                {data.title}
              </h2>
              <p className="mb-4 text-gray-600">{data.Description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saport;
