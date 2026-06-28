function AttendanceForm({ formData, handleChange }) {
  return (
    <>
      <input
        type="text"
        name="studentName"
        placeholder="Student Name"
        value={formData.studentName}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
      </select>
    </>
  );
}

export default AttendanceForm;