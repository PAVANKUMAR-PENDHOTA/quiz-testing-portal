const Quiz = require("../models/Quiz");

// CREATE QUIZ
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, duration, questions } = req.body;

    // Basic validation
    if (!title || !duration || !questions) {
      return res.status(400).json({
        success: false,
        message: "Title, duration and questions are required",
      });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one question is required",
      });
    }

    // Validate every question
    for (const question of questions) {
      if (!question.questionText) {
        return res.status(400).json({
          success: false,
          message: "Every question must have question text",
        });
      }

      if (!Array.isArray(question.options) || question.options.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Every question must have at least 2 options",
        });
      }

      if (
        question.correctAnswer === undefined ||
        question.correctAnswer === null
      ) {
        return res.status(400).json({
          success: false,
          message: "Every question must have a correct answer",
        });
      }

      if (
        question.correctAnswer < 0 ||
        question.correctAnswer >= question.options.length
      ) {
        return res.status(400).json({
          success: false,
          message: "Correct answer index is invalid",
        });
      }
    }

    const quiz = await Quiz.create({
      title: title.trim(),
      description: description?.trim() || "",
      duration: Number(duration),
      questions,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    console.error("Create quiz error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create quiz",
    });
  }
};

// GET ALL QUIZZES
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: quizzes.length,
      quizzes,
    });
  } catch (error) {
    console.error("Get quizzes error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
    });
  }
};

// GET QUIZZES CREATED BY LOGGED-IN INSTRUCTOR
exports.getInstructorQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      createdBy: req.user.userId,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: quizzes.length,
      quizzes,
    });
  } catch (error) {
    console.error(
      "Get instructor quizzes error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch instructor quizzes",
      error: error.message,
    });
  }
};

// GET SINGLE QUIZ
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error("Get quiz error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
    });
  }
};

// UPDATE QUIZ
exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Only creator can update
    if (quiz.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own quizzes",
      });
    }

    const { title, description, duration, questions } = req.body;

    quiz.title = title?.trim() || quiz.title;
    quiz.description =
      description !== undefined ? description.trim() : quiz.description;
    quiz.duration = duration || quiz.duration;
    quiz.questions = questions || quiz.questions;

    await quiz.save();

    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      quiz,
    });
  } catch (error) {
    console.error("Update quiz error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update quiz",
    });
  }
};

// DELETE QUIZ
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Only creator can delete
    if (quiz.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own quizzes",
      });
    }

    await Quiz.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.error("Delete quiz error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete quiz",
    });
  }
};

// GET QUIZ FOR STUDENT
exports.getQuizForStudent = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select(
      "-questions.correctAnswer"
    );

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error("Get student quiz error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
    });
  }
};