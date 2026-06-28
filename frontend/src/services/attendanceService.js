import api from "./api";

const tokenHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAttendance = async () => {
  const res = await api.get("/attendance", tokenHeader());
  return res.data;
};

export const createAttendance = async (data) => {
  const res = await api.post("/attendance", data, tokenHeader());
  return res.data;
};

export const updateAttendance = async (id, data) => {
  const res = await api.put(`/attendance/${id}`, data, tokenHeader());
  return res.data;
};

export const deleteAttendance = async (id) => {
  const res = await api.delete(`/attendance/${id}`, tokenHeader());
  return res.data;
};