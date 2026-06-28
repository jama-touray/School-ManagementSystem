const Student = require("../models/Student");
const Course = require("../models/Course");

const getDashboardStats = async (req, res) => {
  try {
    // Statistics
    const totalStudents = await Student.countDocuments();

    const totalCourses = await Course.countDocuments();

    const activeStudents = await Student.countDocuments({
      status: "Active",
    });

    const inactiveStudents = await Student.countDocuments({
      status: "Inactive",
    });

    // Latest 5 students
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalStudents,
      totalCourses,
      activeStudents,
      inactiveStudents,
      recentStudents,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};