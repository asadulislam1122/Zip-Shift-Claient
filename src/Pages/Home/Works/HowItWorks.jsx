import { FiTruck, FiMapPin } from "react-icons/fi";

const steps = [
  {
    id: 1,
    icon: <FiMapPin size={40} />,
    title: "Booking Pick & Drop",
    text: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 2,
    icon: <FiTruck size={40} />,
    title: "Cash On Delivery",
    text: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 3,
    icon: <FiTruck size={40} />,
    title: "Delivery Hub",
    text: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 4,
    icon: <FiMapPin size={40} />,
    title: "Booking SME & Corporate",
    text: "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowItWorks = () => {
  return (
    <div className="w-full py-12">
      <h2 className="text-3xl font-bold mb-8">How it Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-red-50 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition"
          >
            <div className="flex justify-center mb-4 text-red-600">
              {step.icon}
            </div>

            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>

            <p className="text-sm text-gray-600">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
