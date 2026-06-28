import { useState } from "react";
import CourseForm from "./CourseForm";
import { createCourse } from "../services/courseService";
import toast from "react-hot-toast";

function AddCourseModal({ onClose, onCourseAdded }) {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    department: "",
    duration: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCourse(formData);

      toast.success("Course added successfully!");

      onCourseAdded();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Failed to add course"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Add Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <CourseForm
            formData={formData}
            handleChange={handleChange}
          />

          <div className="flex justify-end gap-3 pt-4">

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
              Add Course
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddCourseModal;