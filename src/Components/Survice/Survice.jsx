import React from "react";
import {
  FiTruck,
  FiGlobe,
  FiBox,
  FiDollarSign,
  FiBriefcase,
  FiRotateCw,
} from "react-icons/fi";

const data = [
  {
    id: 1,
    icon: <FiTruck />,
    title: "Express & Standard Delivery",
    Description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    id: 2,
    icon: <FiGlobe />,
    title: "Nationwide Delivery",
    Description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    id: 3,
    icon: <FiBox />,
    title: "Fulfillment Solution",
    Description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    id: 4,
    icon: <FiDollarSign />,
    title: "Cash on Home Delivery",
    Description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    id: 5,
    icon: <FiBriefcase />,
    title: "Corporate Service / Contract In Logistics",
    Description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    id: 6,
    icon: <FiRotateCw />,
    title: "Parcel Return",
    Description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const Survice = () => {
  return (
    <div className="p-6 bg-secondary rounded-3xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Our Services</h2>
        <p className="text-white mt-3">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 m-4">
        {data.map((dat) => (
          <div
            key={dat.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg bg-white hover:bg-primary transition text-center"
          >
            <div className="text-4xl text-blue-500 mb-3 flex flex justify-center">
              {dat.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{dat.title}</h3>
            <p className="text-gray-700">{dat.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Survice;
