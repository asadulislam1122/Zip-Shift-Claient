import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveris = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/paecels/riders?riderEmail=${user.email}&deliveryStatus=parcel_delivered ✅`
      );
      return res.data;
    },
  });
  // console.log(parcels);
  const calculatePayout = (parcel) => {
    if (parcel.senderDistricts === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center p-3 text-green-500">
        Completed Delevaris: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Pickup District</th>
              <th> Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost} Taka</td>
                <td>{calculatePayout(parcel)} Taka</td>
                <td>{parcel.trackingId}</td>
                <td>
                  {" "}
                  {parcel.senderAddress}, {parcel.senderDistricts}
                </td>
                <td>{new Date(parcel.createAt).toLocaleString()}</td>

                <td>
                  <button className="btn btn-sm btn-primary text-black">
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveris;
