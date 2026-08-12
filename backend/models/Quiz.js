const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Option text is required"],
      trim: true,
    },
  },
  {
    _id: true,
  }
);

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },

    options: {
      type: [optionSchema],
      validate: {
        validator: function (options) {
          return options.length >= 2;
        },
        message: "At least 2 options are required",
      },
    },

    correctAnswer: {
      type: Number,
      required: [true, "Correct answer is required"],
      min: 0,
    },
  },
  {
    _id: true,
  }
);

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"],
      trim: true,
      minlength: [3, "Quiz title must be at least 3 characters"],
      maxlength: [100, "Quiz title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },

    questions: {
      type: [questionSchema],
      validate: {
        validator: function (questions) {
          return questions.length > 0;
        },
        message: "Quiz must contain at least one question",
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Quiz creator is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);