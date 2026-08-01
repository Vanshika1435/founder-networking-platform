import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/event-registration`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const registerEvent = async (data) => {
  const res = await axios.post(
    `${API}/`,
    data,
    authHeader()
  );

  return res.data;
};