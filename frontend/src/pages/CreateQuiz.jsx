import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateQuiz.css";

const API_URL = import.meta.env.VITE_API_URL;

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(10);

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Add question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  // Remove question
  const removeQuestion = (index) => {
    if (questions.length === 1) return;

    setQuestions(
      questions.filter(
        (_, i) => i !== index
      )
    );
  };

  // Question text
  const handleQuestionChange = (
    questionIndex,
    value
  ) => {
    const updated = [...questions];

    updated[questionIndex].questionText =
      value;

    setQuestions(updated);
  };

  // Option text
  const handleOptionChange = (
    questionIndex,
    optionIndex,
    value
  ) => {
    const updated = [...questions];

    updated[questionIndex].options[
      optionIndex
    ] = value;

    setQuestions(updated);
  };

  // Correct answer
  const handleCorrectAnswerChange = (
    questionIndex,
    optionIndex
  ) => {
    const updated = [...questions];

    updated[questionIndex].correctAnswer =
      optionIndex;

    setQuestions(updated);
  };

  // Submit quiz
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Quiz title is required.");
      return;
    }

    if (!duration || duration <= 0) {
      setError(
        "Duration must be greater than 0."
      );
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      if (!question.questionText.trim()) {
        setError(
          `Question ${i + 1} is required.`
        );
        return;
      }

      if (
        question.options.some(
          (option) => !option.trim()
        )
      ) {
        setError(
          `All options for Question ${
            i + 1
          } are required.`
        );
        return;
      }
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/quizzes`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            title: title.trim(),
            description:
              description.trim(),
            duration: Number(duration),

            questions: questions.map(
              (question) => ({
                questionText:
                  question.questionText.trim(),

                options:
                  question.options.map(
                    (text) => ({
                      text: text.trim(),
                    })
                  ),

                correctAnswer:
                  question.correctAnswer,
              })
            ),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create quiz"
        );
      }

      alert("Quiz created successfully!");

      navigate("/instructor/quizzes");
    } catch (error) {
      console.error(
        "CREATE QUIZ ERROR:",
        error
      );

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-quiz-page">

      <div className="create-quiz-container">

        <div className="create-quiz-header">

          <div>
            <h1>Create Quiz</h1>

            <p>
              Build a multiple-choice
              assessment for your students.
            </p>
          </div>

          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate("/instructor")
            }
          >
            ← Dashboard
          </button>

        </div>

        {error && (
          <div className="create-error">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="create-quiz-form"
        >

          {/* BASIC INFORMATION */}

          <div className="form-section">

            <h2>
              Quiz Information
            </h2>

            <div className="form-group">

              <label>
                Quiz Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter quiz title"
              />

            </div>

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Enter quiz description"
                rows="3"
              />

            </div>

            <div className="form-group duration-group">

              <label>
                Duration (Minutes)
              </label>

              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) =>
                  setDuration(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* QUESTIONS */}

          {questions.map(
            (question, questionIndex) => (
              <div
                className="question-section"
                key={questionIndex}
              >

                <div className="question-header">

                  <h2>
                    Question{" "}
                    {questionIndex + 1}
                  </h2>

                  {questions.length > 1 && (
                    <button
                      type="button"
                      className="remove-question"
                      onClick={() =>
                        removeQuestion(
                          questionIndex
                        )
                      }
                    >
                      Remove
                    </button>
                  )}

                </div>

                <div className="form-group">

                  <label>
                    Question
                  </label>

                  <input
                    type="text"
                    value={
                      question.questionText
                    }
                    onChange={(e) =>
                      handleQuestionChange(
                        questionIndex,
                        e.target.value
                      )
                    }
                    placeholder="Enter question"
                  />

                </div>

                <div className="options-container">

                  <label>
                    Options
                  </label>

                  {question.options.map(
                    (option, optionIndex) => (
                      <div
                        className="option-row"
                        key={optionIndex}
                      >

                        <input
                          type="radio"
                          name={`correct-${questionIndex}`}
                          checked={
                            question.correctAnswer ===
                            optionIndex
                          }
                          onChange={() =>
                            handleCorrectAnswerChange(
                              questionIndex,
                              optionIndex
                            )
                          }
                        />

                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Option ${
                            optionIndex + 1
                          }`}
                        />

                        <span>
                          {question.correctAnswer ===
                          optionIndex
                            ? "Correct"
                            : ""}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>
            )
          )}

          <div className="quiz-actions">

            <button
              type="button"
              className="add-question-btn"
              onClick={addQuestion}
            >
              + Add Question
            </button>

            <button
              type="submit"
              className="publish-btn"
              disabled={loading}
            >
              {loading
                ? "Publishing..."
                : "Publish Quiz"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateQuiz;