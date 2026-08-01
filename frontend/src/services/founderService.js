import axios from "axios";

const API = "http://127.0.0.1:8000/founders";

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