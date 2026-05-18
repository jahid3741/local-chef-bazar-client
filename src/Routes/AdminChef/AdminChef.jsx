import { Navigate, useLocation } from "react-router";
import Loading from "../../Components/Shared/Loading/Loading";
import useRole from "../../Hooks/UseRole/UseRole";
import useAuth from "../../Hooks/UseAuth/UseAuth";

const ChefRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const [roleData, isLoading] = useRole();

  const location = useLocation();

  if (loading || isLoading) {
    return <Loading />;
  }

  if (user && roleData?.role === "chef") {
    return children;
  }

  return <Navigate to="/" state={location.pathname} replace />;
};

export default ChefRoute;
