import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccessFul = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");

  console.log(sessionId);
  const axiosSecure = useAxiosSecure();
  //
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="flex justify-center  items-center h-screen p-6">
      <div
        className="
      w-full max-w-md 
      bg-white/30 backdrop-blur-xl 
      shadow-xl border border-white/40 
      rounded-3xl 
      p-6 text-center
      transition-all duration-300
      hover:shadow-2xl hover:scale-105
      "
      >
        <h2
          className="
        text-3xl md:text-4xl 
        font-bold 
        bg-gradient-to-r from-blue-500 to-green-500 
        bg-clip-text text-transparent
        transition-all duration-300
        hover:tracking-wide
      "
        >
          Payment Successful!
        </h2>
        <p className="mt-3 text-gray-700 text-sm md:text-base">
          Your Transaction Id: {paymentInfo.transactionId}
        </p>
        <p className="mt-3 text-gray-700 text-sm md:text-base">
          Your Parcel Tracking Id: {paymentInfo.trackingId}
        </p>
        <p className="mt-3 text-gray-700 text-sm md:text-base">
          Thank you! Your payment has been processed smoothly.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessFul;
