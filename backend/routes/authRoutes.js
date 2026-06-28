const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

router.get("/test", (req, res) => {
  res.send("Auth route is working");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected route accessed successfully!",
        user: req.user
    });
});

module.exports = router;