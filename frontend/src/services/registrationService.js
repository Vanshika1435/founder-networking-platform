import axios from "axios";

const API = "http://127.0.0.1:8000/event-registration";

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