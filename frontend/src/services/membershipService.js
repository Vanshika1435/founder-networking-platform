import api from "./api";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getMembers = async () => {
  const response = await api.get("/membership/", {
    headers: getHeaders(),
  });

  return response.data;
};

export const approveMember = async (id) => {
  const response = await api.put(
    `/membership/approve/${id}`,
    {},
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};

export const rejectMember = async (id) => {
  const response = await api.put(
    `/membership/reject/${id}`,
    {},
    {
      headers: getHeaders(),
    }
  );

  return response.data;
};