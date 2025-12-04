import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/paecels/riders?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });
  console.log(parcels);
  const handleStatusDeleveridUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    let message = `parcel status is update with ${status.split("_").join(" ")}`;
    axiosSecure
      .patch(`parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center p-2 text-green-500">
        Parcels Pending Pickup: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Parcel Name</th>
              <th>Receiver Name</th>
              <th>Cost</th>
              <th>Parcel Weight</th>
              <th>Address</th>
              <th>Confirm</th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.cost} Taka</td>
                <td>{parcel.parcelWeight} Kg</td>
                <td>
                  {parcel.receiverAddress}, {parcel.receiverDistrict}
                </td>
                <td className="flex gap-2">
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleStatusDeleveridUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-primary btn-active text-black hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-black hover:bg-red-500">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted ✅</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleStatusDeleveridUpdate(parcel, "parcel_picked_up")
                    }
                    className="btn btn-primary btn-active btn-sm text-black hover:bg-green-600"
                  >
                    Mark asa Pickup
                  </button>
                  <button
                    onClick={() =>
                      handleStatusDeleveridUpdate(parcel, "parcel_delivered ✅")
                    }
                    className="btn btn-sm btn-primary btn-active ml-2 text-black hover:bg-green-600"
                  >
                    Marks as Delivered
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

export default AssignedDeliveries;
