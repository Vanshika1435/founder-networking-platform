import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/founders`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getFounders = async () => {
  const res = await axios.get(`${API}/`, authHeader());
  return res.data;
};

export const searchFounders = async (params) => {
  const res = await axios.get(`${API}/search`, {
    ...authHeader(),
    params,
  });

  return res.data;
};

export const getFounder = async (id) => {
  const res = await axios.get(
    `${API}/${id}`,
    authHeader()
  );

  return res.data;
};