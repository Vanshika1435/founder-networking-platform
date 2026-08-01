import axios from "axios";

const API = "http://127.0.0.1:8000/users";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getUsers = async () => {
  const res = await axios.get(`${API}/`, authHeader());
  return res.data;
};

export const approveUser = async (id) => {
  const res = await axios.put(
    `${API}/${id}/approve`,
    {},
    authHeader()
  );
  return res.data;
};

export const rejectUser = async (id) => {
  const res = await axios.put(
    `${API}/${id}/reject`,
    {},
    authHeader()
  );
  return res.data;
};

export const suspendUser = async (id) => {
  const res = await axios.put(
    `${API}/${id}/suspend`,
    {},
    authHeader()
  );
  return res.data;
};

export const activateUser = async (id) => {
  const res = await axios.put(
    `${API}/${id}/activate`,
    {},
    authHeader()
  );
  return res.data;
};
export const getMemberDropdown = async () => {
  const res = await axios.get(
    `${API}/dropdown`,
    authHeader()
  );

  return res.data;
};