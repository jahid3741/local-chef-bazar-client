import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({});

  useEffect(() => {
    axiosSecure.get("/admin/statistics").then((res) => {
      setStats(res.data);
    });
  }, [axiosSecure]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-10">Platform Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-100 shadow-xl rounded-xl p-8 text-center">
          <h3 className="text-5xl font-bold">{stats.totalUsers || 0}</h3>

          <p className="mt-3 text-lg">Total Users</p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-xl p-8 text-center">
          <h3 className="text-5xl font-bold">{stats.ordersPending || 0}</h3>

          <p className="mt-3 text-lg">Pending Orders</p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-xl p-8 text-center">
          <h3 className="text-5xl font-bold">{stats.ordersDelivered || 0}</h3>

          <p className="mt-3 text-lg">Delivered Orders</p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-xl p-8 text-center">
          <h3 className="text-5xl font-bold">
            ${stats.totalPaymentAmount || 0}
          </h3>

          <p className="mt-3 text-lg">Total Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
