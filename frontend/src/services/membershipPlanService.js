import axios from "axios";

const API = "http://127.0.0.1:8000/membership-plans";

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