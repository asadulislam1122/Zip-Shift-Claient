import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManegement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  console.log(users);
  //
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} Marked as an Admin`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} Remove From Admin`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center p-2 text-blue-500">
        Users Management: ({users.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-teal-400 text-black">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date</th>
              <th>Admin Action</th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createAt).toLocaleString()}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn  bg-red-500"
                    >
                      <FiShieldOff></FiShieldOff>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-500"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
                <td>Action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManegement;
