import api from "./api";

// Get all students
export const getStudents = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/students", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create student
export const createStudent = async (studentData) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/students", studentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update student
export const updateStudent = async (id, studentData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(`/students/${id}`, studentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete student
export const deleteStudent = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/students/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};