function StudentForm({ formData, handleChange, courses = [] }) {
  return (
    <>
      <input
        className="w-full border p-2 rounded"
        placeholder="Student ID"
        name="studentId"
        value={formData.studentId}
        onChange={handleChange}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        type="date"
        className="w-full border p-2 rounded"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      />

      {/* Course Dropdown */}
      <select
        className="w-full border p-2 rounded"
        name="course"
        value={formData.course}
        onChange={handleChange}
      >
        <option value="">Select Course</option>

        {courses.map((course) => (
          <option key={course._id} value={course.courseName}>
            {course.courseName}
          </option>
        ))}
      </select>

      <input
        className="w-full border p-2 rounded"
        placeholder="Year"
        name="year"
        value={formData.year}
        onChange={handleChange}
      />
    </>
  );
}

export default StudentForm;