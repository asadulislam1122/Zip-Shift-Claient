// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { IoMdSearch } from "react-icons/io";
// import { MdDeleteSweep, MdOutlineModeEditOutline } from "react-icons/md";
// import { TbCurrencyTaka } from "react-icons/tb";
// import Swal from "sweetalert2";
// import { Link } from "react-router";
// const Myparcels = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   // tanstack Quary
//   const { data: parcels = [], refetch } = useQuery({
//     queryKey: ["myParcels", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/parcels?email=${user.email}`);
//       return res.data;
//     },
//   });
//   console.log(parcels);
//   // handle edit delete search
//   const handleDelete = (id) => {
//     // console.log(id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/parcels/${id}`).then((res) => {
//           // console.log(res.data);
//           if (res.data.deletedCount) {
//             refetch(),
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "Your parcel request has been deleted.",
//                 icon: "success",
//               });
//           }
//         });
//       }
//     });
//   };
//   return (
//     <div>
//       <h2 className="text-center font-bold text-3xl text-green-500 mt-6 mb-6">
//         All of my Parcels:{" "}
//         <span className="text-blue-600"> ({parcels.length})</span>
//       </h2>
//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Name</th>
//               <th>Cost</th>
//               <th>Receiver Name</th>
//               <th>Receiver Region</th>
//               <th>Payment</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcels.map((parcel, index) => {
//               return (
//                 <tr key={parcel._id}>
//                   <th>{index + 1}</th>
//                   <td>{parcel.parcelName}</td>
//                   <td className="flex items-center">
//                     {parcel?.cost ? (
//                       <>
//                         {parcel.cost}
//                         <TbCurrencyTaka />
//                       </>
//                     ) : (
//                       <>
//                         0<TbCurrencyTaka />
//                       </>
//                     )}
//                   </td>
//                   <td>{parcel.receiverName}</td>
//                   <td>{parcel.receiverRegion}</td>
//                   <td>
//                     {parcel.paymentStatus === "paid" ? (
//                       <span className="btn btn-sm text-black bg-pink-400">
//                         Paid
//                       </span>
//                     ) : (
//                       <Link to={`/dashboard/payment/${parcel._id}`}>
//                         <button className="btn btn-sm text-black hover:bg-lime-600 btn-primary">
//                           Pay
//                         </button>
//                       </Link>
//                     )}
//                   </td>
//                   <td className="flex gap-2">
//                     <button className="btn btn-square hover:bg-primary">
//                       <IoMdSearch />
//                     </button>
//                     <button className="btn btn-square hover:bg-blue-500">
//                       <MdOutlineModeEditOutline />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(parcel._id)}
//                       className="btn btn-square hover:bg-red-500"
//                     >
//                       <MdDeleteSweep />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Myparcels;
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
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-center font-extrabold text-4xl text-gray-800 mt-6 mb-10 border-b-4 border-teal-500 pb-2 inline-block mx-auto">
        📦 My Parcel Requests
        <span className="text-teal-600 ml-2"> ({parcels.length})</span>
      </h2>
      <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-teal-500 text-white text-sm uppercase">
            <tr>
              <th className="py-3 px-6">No</th>
              <th className="py-3 px-6">Parcel Name</th>
              <th className="py-3 px-6">Cost</th>
              <th className="py-3 px-6">Receiver Name</th>
              <th className="py-3 px-6">Receiver Region</th>
              <th className="py-3 px-6">Payment Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {parcels.map((parcel, index) => {
              return (
                <tr
                  key={parcel._id}
                  className="hover:bg-teal-50 transition duration-150 ease-in-out"
                >
                  <th className="font-medium">{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td className="font-semibold text-teal-600 flex items-center">
                    {parcel?.cost ? (
                      <>
                        {parcel.cost}
                        <TbCurrencyTaka className="text-lg ml-0.5" />
                      </>
                    ) : (
                      <>
                        0<TbCurrencyTaka className="text-lg ml-0.5" />
                      </>
                    )}
                  </td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverRegion}</td>
                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="badge badge-success text-white px-3 py-2 font-semibold bg-green-500 border-green-500">
                        Paid
                      </span>
                    ) : (
                      <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button className="btn btn-sm text-white bg-indigo-600 hover:bg-indigo-700 border-indigo-600 transition duration-150">
                          Pay Now
                        </button>
                      </Link>
                    )}
                  </td>
                  <td className="flex gap-2">
                    {/* View/Search Button */}
                    <button
                      className="btn btn-square btn-sm bg-gray-200 hover:bg-teal-400 text-gray-600 hover:text-white transition duration-150 tooltip"
                      data-tip="View Details"
                    >
                      <IoMdSearch className="text-xl" />
                    </button>
                    {/* Edit Button */}
                    <button
                      className="btn btn-square btn-sm bg-gray-200 hover:bg-blue-500 text-gray-600 hover:text-white transition duration-150 tooltip"
                      data-tip="Edit Parcel"
                    >
                      <MdOutlineModeEditOutline className="text-xl" />
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-square btn-sm bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white transition duration-150 tooltip"
                      data-tip="Delete Parcel"
                    >
                      <MdDeleteSweep className="text-xl" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {parcels.length === 0 && (
        <div className="text-center mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p className="font-semibold">No parcels found.</p>
          <p>It looks like you haven't booked any parcels yet.</p>
        </div>
      )}
    </div>
  );
};

export default Myparcels;
