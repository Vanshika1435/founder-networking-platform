import api from "./api";

export const loginUser = async (data) => {
  const response = await api.post("/auth/token", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};