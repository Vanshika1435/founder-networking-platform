import axios from "axios";

const API = "http://127.0.0.1:8000/memberships";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMemberships = async () => {
  const res = await axios.get(`${API}/`, authHeader());
  return res.data;
};

export const renewMembership = async (id) => {
  const res = await axios.put(
    `${API}/${id}/renew`,
    {},
    authHeader()
  );
  return res.data;
};

export const createMembership = async (data) => {
  const res = await axios.post(
    `${API}/`,
    data,
    authHeader()
  );
  return res.data;
};

export const updateMembership = async (id, data) => {
  const res = await axios.put(
    `${API}/${id}`,
    data,
    authHeader()
  );
  return res.data;
};

export const deleteMembership = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,
    authHeader()
  );
  return res.data;
};
export const approveMembership = async (id) => {
  const res = await axios.put(
    `${API}/${id}/approve`,
    {},
    authHeader()
  );
  return res.data;
};

export const rejectMembership = async (id) => {
  const res = await axios.put(
    `${API}/${id}/reject`,
    {},
    authHeader()
  );
  return res.data;
};

export const suspendMembership = async (id) => {
  const res = await axios.put(
    `${API}/${id}/suspend`,
    {},
    authHeader()
  );
  return res.data;
};

export const activateMembership = async (id) => {
  const res = await axios.put(
    `${API}/${id}/activate`,
    {},
    authHeader()
  );
  return res.data;
};