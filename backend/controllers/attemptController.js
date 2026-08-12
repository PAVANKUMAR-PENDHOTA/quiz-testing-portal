const mongoose = require("mongoose");
const Attempt = require("../models/Attempt");
const Quiz = require("../models/Quiz");

exports.submitAttempt = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    if (!quizId) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID is required",
      });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers must be an array",
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unanswered = 0;

    const evaluatedAnswers = quiz.questions.map((question) => {
      const submittedAnswer = answers.find(
        (answer) =>
          answer.questionId.toString() ===
          question._id.toString()
      );

      const selectedAnswer =
        submittedAnswer &&
        submittedAnswer.selectedAnswer !== null
          ? submittedAnswer.selectedAnswer
          : null;

      if (selectedAnswer === null) {
        unanswered++;
      } else if (selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }

      return {
        questionId: question._id,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect:
          selectedAnswer !== null &&
          selectedAnswer === question.correctAnswer,
      };
    });

    const totalQuestions = quiz.questions.length;

    const score = correctAnswers;

    const percentage =
      totalQuestions > 0
        ? Number(
            ((correctAnswers / totalQuestions) * 100).toFixed(2)
          )
        : 0;

    const attempt = await Attempt.create({
      student: req.user.userId,
      quiz: quiz._id,
      answers: evaluatedAnswers,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      unanswered,
      score,
      percentage,
    });

    return res.status(201).json({
      success: true,
      message: "Quiz submitted successfully",
      result: {
        attemptId: attempt._id,
        quizId: quiz._id,
        quizTitle: quiz.title,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        unanswered,
        score,
        percentage,
        answers: evaluatedAnswers,
      },
    });
  } catch (error) {
    console.error("SUBMIT ATTEMPT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit quiz",
    });
  }
};

exports.getMyAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({
      student: req.user.userId,
    })
      .populate("quiz", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      attempts,
    });
  } catch (error) {
    console.error(
      "GET ATTEMPTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch attempt history",
    });
  }
};

// GET LEADERBOARD FOR A QUIZ
exports.getLeaderboard = async (req, res) => {
  try {
    const { quizId } = req.params;

    const leaderboard = await Attempt.aggregate([
      {
        $match: {
          quiz: new mongoose.Types.ObjectId(quizId),
        },
      },

      {
        $sort: {
          percentage: -1,
          score: -1,
          submittedAt: 1,
        },
      },

      {
        $group: {
          _id: "$student",

          bestScore: {
            $max: "$score",
          },

          bestPercentage: {
            $max: "$percentage",
          },

          totalQuestions: {
            $first: "$totalQuestions",
          },
        },
      },

      {
        $sort: {
          bestPercentage: -1,
          bestScore: -1,
        },
      },

      {
        $limit: 100,
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "student",
        },
      },

      {
        $unwind: "$student",
      },

      {
        $project: {
          _id: 0,

          studentId: "$student._id",

          studentName: "$student.name",

          score: "$bestScore",

          percentage: "$bestPercentage",

          totalQuestions: 1,
        },
      },
    ]);

    const rankedLeaderboard = leaderboard.map(
      (student, index) => ({
        rank: index + 1,
        ...student,
      })
    );

    return res.status(200).json({
      success: true,
      leaderboard: rankedLeaderboard,
    });
  } catch (error) {
    console.error(
      "LEADERBOARD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
    });
  }
};


// GET INSTRUCTOR QUIZ ANALYTICS
exports.getQuizAnalytics = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Make sure instructor owns this quiz
    if (
      quiz.createdBy.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to view this quiz analytics",
      });
    }

    const analytics = await Attempt.aggregate([
      {
        $match: {
          quiz: new mongoose.Types.ObjectId(quizId),
        },
      },

      {
        $group: {
          _id: null,

          totalAttempts: {
            $sum: 1,
          },

          averageScore: {
            $avg: "$score",
          },

          averagePercentage: {
            $avg: "$percentage",
          },

          highestScore: {
            $max: "$score",
          },

          lowestScore: {
            $min: "$score",
          },
        },
      },
    ]);

    const result = analytics[0] || {
      totalAttempts: 0,
      averageScore: 0,
      averagePercentage: 0,
      highestScore: 0,
      lowestScore: 0,
    };

    return res.status(200).json({
      success: true,

      quiz: {
        id: quiz._id,
        title: quiz.title,
        totalQuestions: quiz.questions.length,
      },

      analytics: {
        totalAttempts: result.totalAttempts,
        averageScore: Number(
          result.averageScore.toFixed(2)
        ),
        averagePercentage: Number(
          result.averagePercentage.toFixed(2)
        ),
        highestScore: result.highestScore,
        lowestScore: result.lowestScore,
      },
    });
  } catch (error) {
    console.error(
      "QUIZ ANALYTICS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quiz analytics",
    });
  }
};