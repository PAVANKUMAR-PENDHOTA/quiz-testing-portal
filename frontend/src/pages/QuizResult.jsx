import { useLocation, useNavigate } from "react-router-dom";
import "./QuizResult.css";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  if (!result) {
    return (
      <div className="result-page">
        <div className="result-card">
          <h2>Result not available</h2>

          <button
            className="back-button"
            onClick={() => navigate("/quizzes")}
          >
            Back to Quizzes
          </button>

          <button
            className="leaderboard-button"
            onClick={() =>
              navigate(
                `/leaderboard/${result.quizId}`
              )
            }
          >
            🏆 View Leaderboard
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="result-page">
      <div className="result-container">

        <div className="result-card">

          <h1>Quiz Completed 🎉</h1>

          <h2>{result.quizTitle}</h2>

          <div className="score-circle">
            <span>{result.percentage}%</span>
          </div>

          <div className="result-stats">

            <div className="result-stat">
              <strong>
                {result.totalQuestions}
              </strong>
              <span>Total</span>
            </div>

            <div className="result-stat correct">
              <strong>
                {result.correctAnswers}
              </strong>
              <span>Correct</span>
            </div>

            <div className="result-stat wrong">
              <strong>
                {result.wrongAnswers}
              </strong>
              <span>Wrong</span>
            </div>

            <div className="result-stat unanswered">
              <strong>
                {result.unanswered}
              </strong>
              <span>Unanswered</span>
            </div>

          </div>

          <h3>
            Score: {result.score} /{" "}
            {result.totalQuestions}
          </h3>

          <button
            className="back-button"
            onClick={() => navigate("/quizzes")}
          >
            Back to Quizzes
          </button>

        </div>

        <div className="feedback-card">

          <h2>Answer Feedback</h2>

          {result.answers.map(
            (answer, index) => {

              const selected =
                answer.selectedAnswer;

              const correct =
                answer.correctAnswer;

              return (
                <div
                  className={`feedback-item ${answer.isCorrect
                      ? "correct-answer"
                      : "wrong-answer"
                    }`}
                  key={answer.questionId}
                >

                  <div className="feedback-title">
                    <strong>
                      Question {index + 1}
                    </strong>

                    <span>
                      {answer.isCorrect
                        ? "✓ Correct"
                        : selected === null
                          ? "− Unanswered"
                          : "✗ Wrong"}
                    </span>
                  </div>

                  <p>
                    <strong>
                      Your Answer:
                    </strong>{" "}
                    {selected === null
                      ? "Not answered"
                      : `Option ${String.fromCharCode(
                        65 + selected
                      )
                      }`}
                  </p>

                  <p>
                    <strong>
                      Correct Answer:
                    </strong>{" "}
                    Option{" "}
                    {String.fromCharCode(
                      65 + correct
                    )}
                  </p>

                </div>
              );
            }
          )}

        </div>

      </div>
    </div>
  );
};

export default QuizResult;
