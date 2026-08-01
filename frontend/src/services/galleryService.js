import axios from "axios";

const API = "http://127.0.0.1:8000/gallery";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getGallery = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

export const createGallery = async (data) => {
  const res = await axios.post(
    `${API}/`,
    data,
    authHeader()
  );
  return res.data;
};

export const updateGallery = async (id, data) => {
  const res = await axios.put(
    `${API}/${id}`,
    data,
    authHeader()
  );
  return res.data;
};

export const deleteGallery = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    authHeader()
  );
  return res.data;
};