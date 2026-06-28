import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getCourses } from "../services/courseService";
import AddCourseModal from "../components/AddCourseModal";
import EditCourseModal from "../components/EditCourseModal";

function Courses() {
  const role = localStorage.getItem("role");

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) =>
      `${course.courseCode} ${course.courseName} ${course.department}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredCourses(filtered);
  }, [search, courses]);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Course Management</h1>

        {role === "Admin" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg"
          >
            + Add Course
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-center border rounded-lg px-3">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full p-3 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Status</th>

              {role === "Admin" && (
                <th className="p-3 text-left">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>

            {filteredCourses.map((course) => (

              <tr key={course._id} className="border-b hover:bg-gray-50">

                <td className="p-3">{course.courseCode}</td>
                <td className="p-3">{course.courseName}</td>
                <td className="p-3">{course.department}</td>
                <td className="p-3">{course.duration} Years</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      course.status === "Active"
                        ? "bg-emerald-600"
                        : "bg-rose-600"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>

                {role === "Admin" && (
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 font-semibold"
                    >
                      Edit
                    </button>
                  </td>
                )}

              </tr>

            ))}

          </tbody>

        </table>
      </div>

      {showAddModal && (
        <AddCourseModal
          onClose={() => setShowAddModal(false)}
          onCourseAdded={loadCourses}
        />
      )}

      {showEditModal && selectedCourse && (
        <EditCourseModal
          course={selectedCourse}
          onClose={() => setShowEditModal(false)}
          onCourseUpdated={loadCourses}
        />
      )}

    </div>
  );
}

export default Courses;