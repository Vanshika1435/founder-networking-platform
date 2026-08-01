import axios from "axios";

const API = "http://127.0.0.1:8000/blogs";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getBlogs = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

export const createBlog = async (data) => {
  const res = await axios.post(
    `${API}/`,
    data,
    authHeader()
  );
  return res.data;
};

export const updateBlog = async (id, data) => {
  const res = await axios.put(
    `${API}/${id}`,
    data,
    authHeader()
  );
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    authHeader()
  );
  return res.data;
};