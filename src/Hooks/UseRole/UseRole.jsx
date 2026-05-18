import { useQuery } from "@tanstack/react-query";
import useAuth from "../UseAuth/UseAuth";
import axiosSecure from "../../Api/AxiosSecure/AxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();

  const { data: roleData = {}, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],

    enabled: !loading && !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);

      return res.data;
    },
  });

  return [roleData, isLoading];
};

export default useRole;
