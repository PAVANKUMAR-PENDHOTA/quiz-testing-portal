const express = require("express");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  submitAttempt,
  getMyAttempts,
  getLeaderboard,
  getQuizAnalytics,
} = require("../controllers/attemptController");

const router = express.Router();


// Submit quiz
router.post(
  "/",
  protect,
  authorize("student"),
  submitAttempt
);


// Student attempt history
router.get(
  "/my-attempts",
  protect,
  authorize("student"),
  getMyAttempts
);


// Quiz leaderboard
router.get(
  "/leaderboard/:quizId",
  protect,
  authorize("student"),
  getLeaderboard
);


// Instructor analytics
router.get(
  "/analytics/:quizId",
  protect,
  authorize("instructor"),
  getQuizAnalytics
);


module.exports = router;