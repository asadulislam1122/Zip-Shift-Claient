import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalref = useRef();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });
  console.log(parcels);
  const openAssignRiderModal = (parcel) => {
    riderModalref.current.showModal();
  };
  return (
    <div>
      <h2 className="text-3xl p-4 text-green-500 font-semibold text-center">
        Assign Raider: {parcels.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>TrackingId</th>
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
                <td>{parcel.cost}</td>
                <td>{parcel.trackingId}</td>
                <td>
                  {" "}
                  {parcel.senderAddress}, {parcel.senderDistricts}
                </td>
                <td>{new Date(parcel.createAt).toLocaleString()}</td>

                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-sm btn-primary text-black"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={riderModalref}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
