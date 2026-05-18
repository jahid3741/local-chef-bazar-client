import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
