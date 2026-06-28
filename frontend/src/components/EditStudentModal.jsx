import { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import { updateStudent } from "../services/studentService";
import { getCourses } from "../services/courseService";

function EditStudentModal({ student, onClose, onStudentUpdated }) {
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    studentId: student.studentId || "",
    firstName: student.firstName || "",
    lastName: student.lastName || "",
    email: student.email || "",
    phone: student.phone || "",
    dateOfBirth: student.dateOfBirth
      ? student.dateOfBirth.split("T")[0]
      : "",
    gender: student.gender || "",
    course: student.course || "",
    year: student.year || "",
    status: student.status || "Active",
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
      await updateStudent(student._id, formData);

      alert("Student updated successfully!");

      onStudentUpdated();
      onClose();

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        error.message ||
        "Failed to update student"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Edit Student
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <StudentForm
            formData={formData}
            handleChange={handleChange}
            courses={courses}
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Student
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditStudentModal;