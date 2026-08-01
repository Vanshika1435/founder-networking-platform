import axios from "axios";

const API = "http://127.0.0.1:8000/events";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getEvents = async () => {
    const res = await axios.get(`${API}/`, authHeader());
    return res.data;
};

export const createEvent = async (data) => {
    const res = await axios.post(
        `${API}/`,
        data,
        authHeader()
    );
    return res.data;
};

export const updateEvent = async (id, data) => {
    const res = await axios.put(
        `${API}/${id}`,
        data,
        authHeader()
    );
    return res.data;
};

export const deleteEvent = async (id) => {
    const res = await axios.delete(
        `${API}/${id}`,
        authHeader()
    );
    return res.data;
};