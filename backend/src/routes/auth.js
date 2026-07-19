const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const authController = require("../controllers/authController");
const requireAdmin = require("../middleware/requireAdmin");

// Limits brute-force login attempts: 10 tries per 15 minutes per IP.
// Only applied to /login — /me and /logout are unaffected.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, authController.login);

router.post("/logout", authController.logout);

router.get("/me", requireAdmin, authController.me);

module.exports = router;