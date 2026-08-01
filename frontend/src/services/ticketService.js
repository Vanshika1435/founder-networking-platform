import axios from "axios";

const API = "http://127.0.0.1:8000/tickets";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTickets = async () => {
  const res = await axios.get(`${API}/`, authHeader());
  return res.data;
};

export const getTicket = async (id) => {
  const res = await axios.get(`${API}/${id}`, authHeader());
  return res.data;
};