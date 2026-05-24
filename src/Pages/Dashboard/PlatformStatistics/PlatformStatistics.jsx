import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  CartesianGrid
} from "recharts";
import { FiUsers, FiClock, FiCheckCircle, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});

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

  const PIE_COLORS = ["#8b5cf6", "#f59e0b"];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-extrabold text-base-content flex items-center gap-3">
          Platform Statistics <FiTrendingUp className="text-primary" />
        </h2>
        <p className="text-base-content/60 mt-1 font-medium">Overview of the marketplace performance</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        <motion.div variants={itemVariants} className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <FiUsers className="text-2xl" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-base-content relative z-10">{stats.totalUsers || 0}</h2>
          <p className="mt-1 text-base-content/60 font-semibold uppercase tracking-wider text-xs relative z-10">Total Users</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-warning/10 transition-colors duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="p-3 bg-warning/10 text-warning rounded-xl">
              <FiClock className="text-2xl" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-base-content relative z-10">{stats.ordersPending || 0}</h2>
          <p className="mt-1 text-base-content/60 font-semibold uppercase tracking-wider text-xs relative z-10">Pending Orders</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-success/10 transition-colors duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="p-3 bg-success/10 text-success rounded-xl">
              <FiCheckCircle className="text-2xl" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-base-content relative z-10">{stats.ordersDelivered || 0}</h2>
          <p className="mt-1 text-base-content/60 font-semibold uppercase tracking-wider text-xs relative z-10">Delivered Orders</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-colors duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
              <FiDollarSign className="text-2xl" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-base-content relative z-10">${stats.totalPaymentAmount || 0}</h2>
          <p className="mt-1 text-base-content/60 font-semibold uppercase tracking-wider text-xs relative z-10">Total Revenue</p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <motion.div variants={itemVariants} className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-8 text-base-content flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span> Platform Overview
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontWeight: 600 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontWeight: 600 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-base-100 shadow-xl border border-base-200/50 rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-8 text-base-content flex items-center gap-2">
            <span className="w-2 h-6 bg-secondary rounded-full"></span> Revenue Distribution
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlatformStatistics;