import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  getStudents,
  deleteStudent,
} from "../services/studentService";
import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal";
import ViewStudentModal from "../components/ViewStudentModal";

function Students() {
  const role = localStorage.getItem("role");

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) =>
      `${student.studentId} ${student.firstName} ${student.lastName} ${student.email} ${student.course}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredStudents(filtered);
  }, [students, search]);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);
      alert("Student deleted successfully");
      loadStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  };

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Students
        </h1>

        {role === "Admin" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg shadow-lg"
          >
            + Add Student
          </button>
        )}

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">

        <div className="flex items-center border rounded-lg px-3">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search by ID, Name, Email or Course..."
            className="w-full p-3 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-3 text-left">Student ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.length > 0 ? (

              filteredStudents.map((student) => (

                <tr
                  key={student._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">{student.studentId}</td>

                  <td className="p-3">
                    {student.firstName} {student.lastName}
                  </td>

                  <td className="p-3">{student.email}</td>

                  <td className="p-3">{student.course}</td>

                  <td className="p-3">{student.year}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        student.status === "Active"
                          ? "bg-emerald-600"
                          : "bg-rose-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() => handleView(student)}
                      className="text-green-600 font-semibold mr-4"
                    >
                      View
                    </button>

                    {role === "Admin" && (
                      <>
                        <button
                          onClick={() => handleEdit(student)}
                          className="text-blue-600 font-semibold mr-4"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(student._id)}
                          className="text-red-600 font-semibold"
                        >
                          Delete
                        </button>
                      </>
                    )}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No students found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onStudentAdded={loadStudents}
        />
      )}

      {showEditModal && selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStudent(null);
          }}
          onStudentUpdated={loadStudents}
        />
      )}

      {showViewModal && selectedStudent && (
        <ViewStudentModal
          student={selectedStudent}
          onClose={() => {
            setShowViewModal(false);
            setSelectedStudent(null);
          }}
        />
      )}

    </div>
  );
}

export default Students;