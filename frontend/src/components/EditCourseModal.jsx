import { useState } from "react";
import CourseForm from "./CourseForm";
import { updateCourse } from "../services/courseService";
import toast from "react-hot-toast";

function EditCourseModal({ course, onClose, onCourseUpdated }) {
  const [formData, setFormData] = useState({
    courseCode: course.courseCode || "",
    courseName: course.courseName || "",
    department: course.department || "",
    duration: course.duration || "",
    status: course.status || "Active",
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
      await updateCourse(course._id, formData);

      toast.success("Course updated successfully!");

      onCourseUpdated();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update course"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Edit Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <CourseForm
            formData={formData}
            handleChange={handleChange}
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
              Update Course
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditCourseModal;