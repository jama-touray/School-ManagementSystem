import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  getAttendance,
  deleteAttendance,
} from "../services/attendanceService";
import AddAttendanceModal from "../components/AddAttendanceModal";
import EditAttendanceModal from "../components/EditAttendanceModal";

function Attendance() {
  const role = localStorage.getItem("role");

  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedAttendance, setSelectedAttendance] = useState(null);

  useEffect(() => {
    loadAttendance();
  }, []);

  useEffect(() => {
    const filtered = attendance.filter((record) => {
      const studentName = record.student
        ? `${record.student.firstName} ${record.student.lastName}`
        : "";

      return `${studentName} ${record.status}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });

    setFilteredAttendance(filtered);
  }, [attendance, search]);

  const loadAttendance = async () => {
    try {
      const data = await getAttendance();
      setAttendance(data);
      setFilteredAttendance(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (record) => {
    setSelectedAttendance(record);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this attendance record?")) return;

    try {
      await deleteAttendance(id);
      alert("Attendance deleted successfully");
      loadAttendance();
    } catch (error) {
      console.error(error);
      alert("Failed to delete attendance");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Attendance
        </h1>

        {role === "Admin" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg"
          >
            + Record Attendance
          </button>
        )}

      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">

        <div className="flex items-center border rounded-lg px-3">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search student..."
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

              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>

              {role === "Admin" && (
                <th className="p-3 text-left">Actions</th>
              )}

            </tr>

          </thead>

          <tbody>

            {filteredAttendance.length > 0 ? (

              filteredAttendance.map((record) => (

                <tr
                  key={record._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {record.student
                      ? `${record.student.firstName} ${record.student.lastName}`
                      : "Unknown Student"}
                  </td>

                  <td className="p-3">
                    {new Date(record.date).toLocaleDateString()}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        record.status === "Present"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {record.status}
                    </span>

                  </td>

                  {role === "Admin" && (

                    <td className="p-3">

                      <button
                        onClick={() => handleEdit(record)}
                        className="text-blue-600 font-semibold mr-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(record._id)}
                        className="text-red-600 font-semibold"
                      >
                        Delete
                      </button>

                    </td>

                  )}

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={role === "Admin" ? 4 : 3}
                  className="text-center py-8 text-gray-500"
                >
                  No attendance records found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {showAddModal && (
        <AddAttendanceModal
          onClose={() => setShowAddModal(false)}
          onAttendanceAdded={loadAttendance}
        />
      )}

      {showEditModal && selectedAttendance && (
        <EditAttendanceModal
          attendance={selectedAttendance}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAttendance(null);
          }}
          onAttendanceUpdated={loadAttendance}
        />
      )}

    </div>
  );
}

export default Attendance;