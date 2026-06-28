import { useEffect, useState } from "react";
import { getStudents } from "../services/studentService";
import { updateAttendance } from "../services/attendanceService";
import toast from "react-hot-toast";

function EditAttendanceModal({
  attendance,
  onClose,
  onAttendanceUpdated,
}) {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    student: attendance.student?._id || attendance.student || "",
    date: attendance.date
      ? attendance.date.split("T")[0]
      : "",
    status: attendance.status || "Present",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
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
      await updateAttendance(attendance._id, formData);

      toast.success("Attendance updated successfully!");

      onAttendanceUpdated();
      onClose();

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update attendance"
      );

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-2xl font-bold mb-5">
          Edit Attendance
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
            name="student"
            value={formData.student}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >

            <option value="">Select Student</option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.firstName} {student.lastName}
              </option>
            ))}

          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-slate-900 text-white px-5 py-2 rounded"
            >
              Update
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditAttendanceModal;