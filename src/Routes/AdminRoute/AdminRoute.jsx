import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/UseAuth/UseAuth";
import useRole from "../../Hooks/UseRole/UseRole";
import Loading from "../../Components/Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const [roleData, isLoading] = useRole();

  const location = useLocation();

  if (loading || isLoading) {
    return <Loading />;
  }

  if (user && roleData?.role === "admin") {
    return children;
  }

  return <Navigate to="/" state={location.pathname} replace />;
};

export default AdminRoute;
