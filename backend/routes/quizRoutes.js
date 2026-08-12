const express = require("express");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  createQuiz,
  getQuizzes,
  getInstructorQuizzes,
  getQuizById,
  getQuizForStudent,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

const router = express.Router();

// ==========================================
// TEST ROUTES
// ==========================================

// Instructor authorization test
// Get quizzes created by logged-in instructor
router.get(
  "/instructor-test",
  protect,
  authorize("instructor"),
  getInstructorQuizzes
);

// ==========================================
// QUIZ ROUTES
// ==========================================

// Get all quizzes
router.get("/", getQuizzes);

// Create quiz - Instructor only
router.post(
  "/",
  protect,
  authorize("instructor"),
  createQuiz
);

// Student-safe quiz
router.get(
  "/student/:id",
  getQuizForStudent
);

// Get single quiz
router.get("/:id", protect, getQuizById);

// Update quiz - Instructor only
router.put(
  "/:id",
  protect,
  authorize("instructor"),
  updateQuiz
);

// Delete quiz - Instructor only
router.delete(
  "/:id",
  protect,
  authorize("instructor"),
  deleteQuiz
);

module.exports = router;