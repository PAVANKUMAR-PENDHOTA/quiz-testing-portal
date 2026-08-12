import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzes } from "../services/quizService";
import "./QuizList.css";

const QuizList = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data.quizzes || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="quiz-list-status">
        Loading quizzes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-list-status error">
        {error}
      </div>
    );
  }

  return (
    <div className="quiz-list-page">
      <div className="quiz-list-header">
        <div>
          <h1>Available Quizzes</h1>
          <p>Choose an assessment to begin.</p>
        </div>
      </div>

      {quizzes.length === 0 ? (
        <div className="empty-quizzes">
          <h2>No quizzes available</h2>
          <p>Please check back later.</p>
        </div>
      ) : (
        <div className="quiz-grid">
          {quizzes.map((quiz) => (
            <div className="quiz-card" key={quiz._id}>
              <div className="quiz-card-content">
                <h2>{quiz.title}</h2>

                <p className="quiz-description">
                  {quiz.description ||
                    "No description available."}
                </p>

                <div className="quiz-meta">
                  <span>
                    📝 {quiz.questions?.length || 0} Questions
                  </span>

                  <span>
                    ⏱ {quiz.duration} Minutes
                  </span>
                </div>
              </div>

              <button
                className="start-quiz-btn"
                onClick={() =>
                  navigate(`/student/quiz/${quiz._id}`)
                }
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizList;