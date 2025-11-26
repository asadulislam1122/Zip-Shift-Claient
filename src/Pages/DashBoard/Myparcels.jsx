import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoMdSearch } from "react-icons/io";
import { MdDeleteSweep, MdOutlineModeEditOutline } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import Swal from "sweetalert2";
import { Link } from "react-router";
const Myparcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // tanstack Quary
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  console.log(parcels);
  // handle edit delete search
  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            refetch(),
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel request has been deleted.",
                icon: "success",
              });
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-center font-bold text-3xl text-green-500 mt-6 mb-6">
        All of my Parcels:{" "}
        <span className="text-blue-600"> ({parcels.length})</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Receiver Name</th>
              <th>Receiver Region</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => {
              return (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td className="flex items-center">
                    {parcel?.cost ? (
                      <>
                        {parcel.cost}
                        <TbCurrencyTaka />
                      </>
                    ) : (
                      <>
                        0<TbCurrencyTaka />
                      </>
                    )}
                  </td>

                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverRegion}</td>
                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="text-green-500">Paid</span>
                    ) : (
                      <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button className="btn btn-sm text-black hover:bg-lime-600 btn-primary">
                          Pay
                        </button>
                      </Link>
                    )}
                  </td>
                  <td>{parcel.deliveryStatus}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-square hover:bg-primary">
                      <IoMdSearch />
                    </button>
                    <button className="btn btn-square hover:bg-blue-500">
                      <MdOutlineModeEditOutline />
                    </button>
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-square hover:bg-red-500"
                    >
                      <MdDeleteSweep />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myparcels;
