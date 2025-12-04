import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignRider = () => {
  const [selectedParcel, setSelectedParcel] = useState();
  const axiosSecure = useAxiosSecure();
  const riderModalref = useRef();
  const { data: parcels = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });
  console.log(parcels);
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistricts, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders?status=approved&
districts=${selectedParcel.senderDistricts}&workStatus=available`);
      return res.data;
    },
  });
  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalref.current.showModal();
  };
  //
  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.raiderName,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModalref.current.close();
          parcelRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Rider has been Assigned",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
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
                    Find Riders
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
          <h3 className="font-bold text-lg">Riders:{riders.length}</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  {/* <th>District</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, i) => (
                  <tr key={rider._id}>
                    <th>{i + 1}</th>
                    <td>{rider.raiderName}</td>
                    <td>{rider.email}</td>
                    {/* <td>{rider.districts}</td> */}
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn bg-primary text-black btn-sm"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
