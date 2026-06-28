import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportStudentsPDF = (students) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Student Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Student ID", "Name", "Email", "Course", "Year", "Status"]],
    body: students.map((student) => [
      student.studentId,
      `${student.firstName} ${student.lastName}`,
      student.email,
      student.course,
      student.year,
      student.status,
    ]),
  });

  doc.save("Students_Report.pdf");
};

export const exportCoursesPDF = (courses) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Course Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Code", "Course", "Department", "Duration", "Status"]],
    body: courses.map((course) => [
      course.courseCode,
      course.courseName,
      course.department,
      course.duration,
      course.status,
    ]),
  });

  doc.save("Courses_Report.pdf");
};

export const exportAttendancePDF = (attendance) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Attendance Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Student", "Date", "Status"]],
    body: attendance.map((record) => [
      `${record.student?.firstName} ${record.student?.lastName}`,
      new Date(record.date).toLocaleDateString(),
      record.status,
    ]),
  });

  doc.save("Attendance_Report.pdf");
};