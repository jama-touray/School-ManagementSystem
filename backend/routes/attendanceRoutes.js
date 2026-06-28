const express = require("express");
const router = express.Router();

const {
  getAttendance,
  markAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// All logged-in users can view attendance
router.get("/", protect, getAttendance);

// Only Admin can modify attendance
router.post("/", protect, adminOnly, markAttendance);
router.put("/:id", protect, adminOnly, updateAttendance);
router.delete("/:id", protect, adminOnly, deleteAttendance);

module.exports = router;