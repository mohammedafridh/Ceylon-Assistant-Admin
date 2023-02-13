import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../Context/Context";

function ProtectedRoute(props) {
  let { user } = useUserAuth();

  setTimeout(() => {
    if (!user) {
      console.log("user not found");
      return <Navigate to="/" />;
    }
  }, 500);
  return props.children;
}

export default ProtectedRoute;