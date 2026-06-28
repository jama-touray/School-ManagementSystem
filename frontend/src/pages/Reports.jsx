import { useEffect, useState } from "react";
import { getStudents } from "../services/studentService";
import { getCourses } from "../services/courseService";
import { getAttendance } from "../services/attendanceService";
import { exportStudentsExcel } from "../utils/exportExcel";

import {
  exportStudentsPDF,
  exportCoursesPDF,
  exportAttendancePDF,
} from "../utils/exportPDF";

function Reports() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const studentData = await getStudents();
      const courseData = await getCourses();
      const attendanceData = await getAttendance();

      setStudents(studentData);
      setCourses(courseData);
      setAttendance(attendanceData);
    } catch (error) {
      console.error(error);
    }
  };

  const present = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const absent = attendance.filter(
    (a) => a.status === "Absent"
  ).length;

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Reports
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-blue-600 text-white rounded-xl p-6">
          <h2 className="text-lg">Students</h2>
          <p className="text-4xl font-bold mt-3">
            {students.length}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6">
          <h2 className="text-lg">Courses</h2>
          <p className="text-4xl font-bold mt-3">
            {courses.length}
          </p>
        </div>

        <div className="bg-emerald-600 text-white rounded-xl p-6">
          <h2 className="text-lg">Present</h2>
          <p className="text-4xl font-bold mt-3">
            {present}
          </p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">
          <h2 className="text-lg">Absent</h2>
          <p className="text-4xl font-bold mt-3">
            {absent}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Export Reports
        </h2>

        <div className="flex flex-wrap gap-5">

          <button
            onClick={() => exportStudentsPDF(students)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Export Students PDF
          </button>

          <button
            onClick={() => exportCoursesPDF(courses)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Export Courses PDF
          </button>

          <button
            onClick={() => exportAttendancePDF(attendance)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            Export Attendance PDF
          </button>
          <button
  onClick={() => exportStudentsExcel(students)}
  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
>
  Export Students Excel
</button>

        </div>

      </div>

    </div>
  );
}

export default Reports;