import React from "react";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Loading/Loading";
import useRole from "../Hooks/useRole";
import Forbeden from "../Components/Forbeden";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (role !== "admin") {
    return <Forbeden></Forbeden>;
  }
  return children;
};

export default AdminRoute;
