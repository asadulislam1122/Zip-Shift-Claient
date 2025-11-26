import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="m-4 p-4 mt-4 mb-4">
      <h2>********* Pleze Pay ***********</h2>
      <p>Parcel Name: {parcel.parcelName}</p>
      <button className="btn btn-primary hover:bg-lime-600 text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
