import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";

// Import necessary React Icons
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaWeightHanging,
  FaDollarSign,
  FaBox,
  FaMapMarkerAlt,
  FaTruck,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  // Data Fetching Logic (kept as is)
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      // console.log(res.data); // Original console.log kept for reference
      return res.data;
    },
  });

  // handlePayment Logic (kept as is)
  const handlePayment = async () => {
    const paymentaInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post(
      "/create-checkout-session",
      paymentaInfo
    );
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  // Function to format the date (optional but helpful)
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Destructure parcel for cleaner use
  const {
    cost,
    createAt,
    parcelName,
    parcelType,
    parcelWeight,
    receiverDistrict,
    receiverEmail,
    receiverName,
    receiverRegion,
    receiverphoneNo,
    senderDistricts,
    senderEmail,
    senderName,
    receiverAddress,
    senderAddress,
    senderRegion,
    senderphoneNo,
  } = parcel;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-xl overflow-hidden transform hover:scale-[1.01] transition duration-300">
        {/* Header */}
        <div className="bg-lime-600 text-white p-6">
          <h2 className="text-3xl font-extrabold flex items-center">
            <FaTruck className="mr-3" />
            Complete Your Payment
          </h2>
          <p className="text-sm mt-1 opacity-90">
            Parcel ID: **{parcel._id.substring(0, 10)}...**
          </p>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Parcel Details Section (First Column) */}
          <div className="lg:col-span-1 border-r border-gray-200 lg:pr-8">
            <h3 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2 flex items-center">
              <FaBox className="mr-2 text-lime-600" />
              Parcel Information
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                <FaBox className="mr-3 text-sm text-lime-600" /> **Name:**{" "}
                {parcelName}
              </p>
              <p className="flex items-center text-gray-600">
                <FaWeightHanging className="mr-3 text-sm text-lime-600" />{" "}
                **Weight:** {parcelWeight} kg
              </p>
              <p className="flex items-center text-gray-600">
                <FaBox className="mr-3 text-sm text-lime-600" /> **Type:**{" "}
                {parcelType}
              </p>
              <p className="flex items-center text-gray-600">
                <FaRegCalendarAlt className="mr-3 text-sm text-lime-600" />{" "}
                **Booked At:** {formatDate(createAt)}
              </p>
            </div>
          </div>

          {/* Sender and Receiver Section (Two Columns on Mobile/Tablet, One Large Column on Desktop) */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender Info */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <h4 className="text-lg font-semibold mb-3 text-lime-700 border-b pb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Sender Details
              </h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <FaUser className="mr-2 text-gray-500" /> **Name:**{" "}
                  {senderName}
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-gray-500" /> **Email:**{" "}
                  {senderEmail}
                </p>
                <p className="flex items-center">
                  <FaPhone className="mr-2 text-gray-500" /> **Phone:**{" "}
                  {senderphoneNo}
                </p>
                <p className="flex items-center">
                  <IoLocationSharp className="mr-2 text-gray-500" />{" "}
                  **Address:**{senderAddress}, {senderDistricts}, {senderRegion}
                </p>
              </div>
            </div>

            {/* Receiver Info */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <h4 className="text-lg font-semibold mb-3 text-lime-700 border-b pb-2 flex items-center">
                <FaTruck className="mr-2" />
                Receiver Details
              </h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <FaUser className="mr-2 text-gray-500" /> **Name:**{" "}
                  {receiverName}
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-gray-500" /> **Email:**{" "}
                  {receiverEmail}
                </p>
                <p className="flex items-center">
                  <FaPhone className="mr-2 text-gray-500" /> **Phone:**{" "}
                  {receiverphoneNo}
                </p>
                <p className="flex items-center">
                  <IoLocationSharp className="mr-2 text-gray-500" />{" "}
                  **Address:** {receiverAddress}, {receiverDistrict},{" "}
                  {receiverRegion},
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Payment Section */}
        <div className="bg-gray-200 p-6 flex flex-col sm:flex-row justify-between items-center mt-4">
          <p className="text-2xl font-extrabold text-gray-800 mb-4 sm:mb-0 flex items-center">
            <FaDollarSign className="text-lime-600 mr-2" />
            Total Payable: **${cost}**
          </p>
          <button
            onClick={handlePayment}
            className="w-full sm:w-auto px-10 py-3 bg-lime-600 text-white font-semibold rounded-lg hover:bg-lime-700 transition duration-300 shadow-lg flex items-center justify-center"
          >
            <FaDollarSign className="mr-2" />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

// import React from "react";
// import { useParams } from "react-router";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../Components/Loading/Loading";

// const Payment = () => {
//   const { parcelId } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { isLoading, data: parcel } = useQuery({
//     queryKey: ["parcels", parcelId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/parcels/${parcelId}`);
//       console.log(res.data);
//       return res.data;
//     },
//   });
//   //
//   const handlePayment = async () => {
//     const paymentaInfo = {
//       cost: parcel.cost,
//       parcelId: parcel._id,
//       senderEmail: parcel.senderEmail,
//       parcelName: parcel.parcelName,
//     };
//     const res = await axiosSecure.post(
//       "/create-checkout-session",
//       paymentaInfo
//     );
//     console.log(res.data);
//     window.location.href = res.data.url;
//   };
//   if (isLoading) {
//     return <Loading></Loading>;
//   }

//   return (
//     <div className="m-4 p-4 mt-4 mb-4">
//       <h2>********* Pleze Pay ***********</h2>
//       <p>
//         parcel pay ${parcel.cost} for: {parcel.parcelName}
//       </p>
//       <button
//         onClick={handlePayment}
//         className="btn btn-primary hover:bg-lime-600 text-black"
//       >
//         Pay
//       </button>
//     </div>
//   );
// };

// export default Payment;
