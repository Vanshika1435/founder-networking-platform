import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/membership-plans`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getPlans = async () => {
  const res = await axios.get(
    `${API}/`,
    authHeader()
  );

  return res.data;
};