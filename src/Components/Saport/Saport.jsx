import React from "react";
import liveParsel from "../../assets/live-tracking.png";
import delivary from "../../assets/tiny-deliveryman.png";
import suportt from "../../assets/safe-delivery.png";
// Import icons for better visuals and to replace the image components in the array
import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

// Renamed array for better clarity/convention
const supportFeatures = [
  {
    id: 1,
    imageSrc: liveParsel, // Use image source path
    icon: <FaShippingFast className="text-6xl text-blue-600 mb-4" />,
    title: "Live Parcel Tracking",
    Description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipments journey and get instant status updates for complete peace of mind.",
  },
  {
    id: 2,
    imageSrc: delivary,
    icon: <FaShieldAlt className="text-6xl text-green-600 mb-4" />,
    title: "100% Safe Delivery",
    Description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    id: 3,
    imageSrc: suportt,
    icon: <FaHeadset className="text-6xl text-red-600 mb-4" />,
    title: "24/7 Call Center Support",
    Description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

// Renamed component for better clarity/convention
const SupportSection = () => {
  return (
    // Use a container to center the content and limit its width
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Optional Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Our Premium Services
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {supportFeatures.map((data) => (
          <div
            key={data.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.02] flex flex-col items-center text-center"
          >
            {/* Image/Icon Block */}
            <div className="mb-4">
              {/* Using image tag directly and applying classes for better control */}
              <img
                src={data.imageSrc}
                alt={data.title}
                className="w-24 h-24 object-contain mx-auto mb-4" // Centered and controlled size
              />
            </div>

            {/* Content Block */}
            <h2 className="font-bold text-2xl text-gray-800 mb-2">
              {data.title}
            </h2>
            <p className="text-gray-600 text-sm">{data.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportSection;
