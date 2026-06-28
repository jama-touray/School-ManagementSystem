function ViewStudentModal({ student, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[600px] p-8">

        <h2 className="text-3xl font-bold mb-6">
          Student Details
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <p><strong>Student ID:</strong> {student.studentId}</p>

          <p><strong>First Name:</strong> {student.firstName}</p>

          <p><strong>Last Name:</strong> {student.lastName}</p>

          <p><strong>Email:</strong> {student.email}</p>

          <p><strong>Phone:</strong> {student.phone}</p>

          <p><strong>Gender:</strong> {student.gender}</p>

          <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>

          <p><strong>Course:</strong> {student.course}</p>

          <p><strong>Year:</strong> {student.year}</p>

          <p><strong>Status:</strong> {student.status}</p>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default ViewStudentModal;