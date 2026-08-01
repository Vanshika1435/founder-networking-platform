/*import api from "./api";

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/dashboard/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};*/
import axios from "axios";

const API = "http://127.0.0.1:8000/dashboard";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboard = async () => {
  const res = await axios.get(`${API}/`, authHeader());
  return res.data;
};