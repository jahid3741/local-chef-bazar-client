import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({});

  // load statistics
  useEffect(() => {
    axiosSecure
      .get("/admin/statistics")
      .then((res) => {
        setStats(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure]);

  // bar chart data
  const barData = [
    {
      name: "Users",
      value: stats.totalUsers || 0,
    },

    {
      name: "Pending",
      value: stats.ordersPending || 0,
    },

    {
      name: "Delivered",
      value: stats.ordersDelivered || 0,
    },
  ];

  // pie chart data
  const pieData = [
    {
      name: "Revenue",
      value: stats.totalPaymentAmount || 0,
    },

    {
      name: "Pending",
      value: stats.ordersPending || 0,
    },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-10">Platform Statistics</h2>

      {/* statistic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <div className="bg-base-100 shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-5xl font-bold">{stats.totalUsers || 0}</h2>

          <p className="mt-3 text-lg">Total Users</p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-5xl font-bold">{stats.ordersPending || 0}</h2>

          <p className="mt-3 text-lg">Pending Orders</p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-5xl font-bold">{stats.ordersDelivered || 0}</h2>

          <p className="mt-3 text-lg">Delivered Orders</p>
        </div>

        <div className="bg-base-100 shadow-xl rounded-2xl p-8 text-center">
          <h2 className="text-5xl font-bold">
            ${stats.totalPaymentAmount || 0}
          </h2>

          <p className="mt-3 text-lg">Total Revenue</p>
        </div>
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* bar chart */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Platform Overview
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* pie chart */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Revenue Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
