import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportStudentsExcel = (students) => {
  const data = students.map((student) => ({
    StudentID: student.studentId,
    Name: `${student.firstName} ${student.lastName}`,
    Email: student.email,
    Course: student.course,
    Year: student.year,
    Status: student.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([excelBuffer]),
    "Students_Report.xlsx"
  );
};