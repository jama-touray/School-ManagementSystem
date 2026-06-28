const Student = require("../models/Student");

// Create Student
const createStudent = async (req, res) => {
  try {
    const {
      studentId,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      course,
      year,
      status,
    } = req.body;

    const existingStudent = await Student.findOne({
      $or: [
        { studentId },
        { email }
      ]
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }

    // Create student
    const student = await Student.create({
      studentId,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      course,
      year,
      status,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Students
const getStudents = async (req, res) => {
    try {

        const students = await Student.find();

        res.status(200).json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Update Student
const updateStudent = async (req, res) => {
    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// Delete Student
const deleteStudent = async (req, res) => {
    try {

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.status(200).json({
            message: "Student deleted successfully",
            student,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};