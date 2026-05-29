import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://local-chef-bazaar-server-azure.vercel.app",
  withCredentials: true,
});

export default axiosSecure;
