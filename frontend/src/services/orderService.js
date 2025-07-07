import axios from "../config/axios";

export const fetchMyOrders = async () => {
  const res = await axios.get("/orders/mine", { withCredentials: true });
  return res.data;
};
