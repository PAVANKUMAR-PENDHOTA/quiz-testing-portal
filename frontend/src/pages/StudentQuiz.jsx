/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
        getStudentQuiz,
        submitQuiz,
      } from "../services/quizService";
import { useAuth } from "../context/AuthContext";
import "./StudentQuiz.css";

const StudentQuiz = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getStudentQuiz(id);

        setQuiz(data.quiz);

        // duration is in minutes
        setTimeLeft(data.quiz.duration * 60);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [id]);

  // Countdown timer
  useEffect(() => {
  if (timeLeft === null || timeLeft <= 0) {
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((previous) => previous - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);

useEffect(() => {
  if (timeLeft === 0) {
    handleSubmit();
  }
}, [timeLeft]);

  const handleAnswer = (optionIndex) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

const handleSubmit = async () => {
  if (isSubmitting) {
    return;
  }

  // Submission requires a logged-in student
  if (!user) {
    setError(
      "Please login as a student before submitting the quiz."
    );

    return;
  }

  if (user.role !== "student") {
    setError(
      "Only students can submit quiz attempts."
    );

    return;
  }

  try {
    setIsSubmitting(true);
    setError("");

    const formattedAnswers = Object.entries(
      answers
    ).map(([questionIndex, selectedAnswer]) => ({
      questionId:
        quiz.questions[Number(questionIndex)]._id,

      selectedAnswer,
    }));

    const data = await submitQuiz(
      quiz._id,
      formattedAnswers
    );

    navigate("/quiz-result", {
      state: data.result,
    });
  } catch (error) {
    console.error(
      "Quiz submission error:",
      error
    );

    setError(error.message);
    setIsSubmitting(false);
  }
};

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  if (loading) {
    return <div className="quiz-status">Loading quiz...</div>;
  }

  if (error) {
    return <div className="quiz-status error">{error}</div>;
  }

  if (!quiz) {
    return <div className="quiz-status">Quiz not found.</div>;
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="student-quiz-page">

      <div className="quiz-header">
        <div>
          <h1>{quiz.title}</h1>

          <p>
            Question {currentQuestion + 1} of{" "}
            {quiz.questions.length}
          </p>
        </div>

        <div
          className={`quiz-timer ${
            timeLeft <= 60 ? "danger" : ""
          }`}
        >
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div className="question-progress">
        {quiz.questions.map((_, index) => (
          <button
            key={index}
            className={`
              question-number
              ${currentQuestion === index ? "active" : ""}
              ${
                answers[index] !== undefined
                  ? "answered"
                  : ""
              }
            `}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="question-card">

        <h2>
          {currentQuestion + 1}. {question.questionText}
        </h2>

        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={option._id || index}
              className={`option ${
                answers[currentQuestion] === index
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleAnswer(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>

              <span>{option.text}</span>
            </button>
          ))}
        </div>

        <div className="quiz-actions">

          <button
            className="secondary-btn"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          {currentQuestion <
          quiz.questions.length - 1 ? (
            <button
              className="primary-btn"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="submit-btn"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;