const Attendance = require("../models/Attendance");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      message: "Attendance recorded successfully",
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Attendance
const getAttendance = async (req, res) => {
  try {

    const attendance = await Attendance.find().populate("student");

    res.status(200).json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update Attendance
const updateAttendance = async (req, res) => {
  try {

    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    res.status(200).json({
      message: "Attendance updated successfully",
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
  try {

    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    res.status(200).json({
      message: "Attendance deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  markAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance,
};