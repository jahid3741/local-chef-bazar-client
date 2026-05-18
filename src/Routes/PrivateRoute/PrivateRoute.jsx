import { Navigate, useLocation } from "react-router";

import useAuth from "../../Hooks/UseAuth/UseAuth";
import Loading from "../../Components/Shared/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname} replace />;
};

export default PrivateRoute;
