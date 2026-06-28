import api from "./api";

// Get all courses
export const getCourses = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create course
export const createCourse = async (courseData) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/courses", courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update course
export const updateCourse = async (id, courseData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(`/courses/${id}`, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete course
export const deleteCourse = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};