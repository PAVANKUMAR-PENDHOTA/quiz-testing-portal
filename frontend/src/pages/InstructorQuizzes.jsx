import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./InstructorQuizzes.css";

const API_URL = import.meta.env.VITE_API_URL;

const InstructorQuizzes = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const response = await fetch(
          `${API_URL}/quizzes/instructor-test`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch quizzes"
          );
        }

        setQuizzes(data.quizzes || []);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="instructor-quizzes-status">
        Loading your quizzes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="instructor-quizzes-status error">
        {error}
      </div>
    );
  }

  return (
    <div className="instructor-quizzes-page">

      <div className="instructor-quizzes-container">

        <div className="instructor-quizzes-header">

          <div>
            <h1>
              My Quizzes
            </h1>

            <p>
              Manage quizzes created by you.
            </p>
          </div>

          <button
            className="create-new-btn"
            onClick={() =>
              navigate(
                "/instructor/create-quiz"
              )
            }
          >
            + Create Quiz
          </button>

        </div>

        {quizzes.length === 0 ? (
          <div className="empty-instructor-quizzes">

            <h2>
              No quizzes created yet
            </h2>

            <p>
              Create your first quiz to
              start assessing students.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/instructor/create-quiz"
                )
              }
            >
              Create Your First Quiz
            </button>

          </div>
        ) : (
          <div className="instructor-quiz-grid">

            {quizzes.map((quiz) => (
              <div
                className="instructor-quiz-card"
                key={quiz._id}
              >

                <h2>
                  {quiz.title}
                </h2>

                <p>
                  {quiz.description ||
                    "No description available."}
                </p>

                <div className="instructor-quiz-meta">

                  <span>
                    📝{" "}
                    {quiz.questions?.length ||
                      0}{" "}
                    Questions
                  </span>

                  <span>
                    ⏱ {quiz.duration} Minutes
                  </span>

                </div>

                <button
                  className="analytics-btn"
                  onClick={() =>
                    navigate(
                      `/quiz-analytics/${quiz._id}`
                    )
                  }
                >
                  View Analytics
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default InstructorQuizzes;