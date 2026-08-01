import axios from "axios";

const API = "http://127.0.0.1:8000/reports";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMembershipReport = async () => {
  const res = await axios.get(
    `${API}/memberships`,
    authHeader()
  );

  return res.data;
};

export const getEventReport = async () => {
  const res = await axios.get(
    `${API}/events`,
    authHeader()
  );

  return res.data;
};

export const getPaymentReport = async () => {
  const res = await axios.get(
    `${API}/payments`,
    authHeader()
  );

  return res.data;
};