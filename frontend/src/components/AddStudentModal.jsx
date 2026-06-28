import { useEffect, useState } from "react";
import { createStudent } from "../services/studentService";
import { getCourses } from "../services/courseService";
import StudentForm from "./StudentForm";
import toast from "react-hot-toast";

function AddStudentModal({ onClose, onStudentAdded }) {
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    course: "",
    year: "",
    status: "Active",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStudent(formData);

      toast.success("Student added successfully!");
      onStudentAdded();
      onClose();

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Failed to add student"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-4">
          Add Student
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <StudentForm
            formData={formData}
            handleChange={handleChange}
            courses={courses}
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded text-white hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
            >
              Save
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddStudentModal;