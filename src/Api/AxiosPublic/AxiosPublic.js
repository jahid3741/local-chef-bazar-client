import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://local-chef-bazaar-server-azure.vercel.app",
  withCredentials: true,
});

export default axiosPublic;
