import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

const PrivateRouter = () => {
  const { currentUser } = useAuthContext();// current user a ihtiyacımız olduğundan ilgili contextten çekiyoruz.
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
