import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const RoleRoute = ({
  role,
  children,
}) => {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user.role !== role) {
    return (
      <Navigate
        to={
          user.role === "instructor"
            ? "/instructor"
            : "/student"
        }
        replace
      />
    );
  }

  return children;
};

export default RoleRoute;