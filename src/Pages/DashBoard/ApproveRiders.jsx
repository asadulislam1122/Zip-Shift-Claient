import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  console.log(riders);

  //   accept raider
  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider Status is set to ${status}`,
          html: "<small style='color:#555'></small>",
          background: "rgba(255, 255, 255, 0.85)",
          backdrop: `
    rgba(0,0,0,0.1)
    left top
    no-repeat
  `,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          toast: true,
          customClass: {
            popup: "animate__animated animate__fadeInDown rounded-xl shadow-xl",
          },
        });
      }
    });
  };
  //
  const handleApprovel = (rider) => {
    updateRiderStatus(rider, "approved");
  };
  //
  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-green-600 text-center p-4">
        Rider Pending Approval: {riders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-teal-500 rounded-2xl text-black uppercase">
              <th>No</th>
              <th>Name</th>
              <th>Region,Districts</th>
              <th>Bike</th>
              <th>Raider Phone No</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <tr key={rider._id}>
                <th>{i + 1}</th>
                <td>{rider.raiderName}</td>
                <td>
                  {rider.region},{rider.districts}
                </td>
                <td>{rider.bike}</td>
                <td>{rider.raiderPhoneNo}</td>
                <td
                  className={`${
                    rider.status === "approved"
                      ? "bg-green-500 btn btn-sm"
                      : "bg-red-500 btn btn-sm"
                  }`}
                >
                  {rider.status}
                </td>
                <td>{rider.workStatus}</td>
                <td>{new Date(rider.createdAt).toLocaleString()}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleApprovel(rider)} className="btn">
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn">
                    <MdDeleteForever />
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

export default ApproveRiders;
