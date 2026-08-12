import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./InstructorDashboard.css";

const InstructorDashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <div className="instructor-dashboard">
      <div className="instructor-container">

        <div className="instructor-welcome">
          <h1>
            Welcome, {user?.name}
          </h1>

          <p>
            Manage your quizzes and monitor
            student performance.
          </p>
        </div>

        <div className="instructor-cards">

          {/* CREATE QUIZ */}
          {/* CREATE QUIZ */}
          <div
            className="instructor-card"
            onClick={() =>
              navigate("/instructor/create-quiz")
            }
          >
            <div className="instructor-icon">
              ➕
            </div>

            <h2>Create Quiz</h2>

            <p>
              Create a new quiz with questions,
              options, answers and time limits.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/instructor/create-quiz");
              }}
            >
              Create Quiz →
            </button>
          </div>


          {/* MY QUIZZES */}
          <div
            className="instructor-card"
            onClick={() =>
              navigate("/instructor/quizzes")
            }
          >
            <div className="instructor-icon">
              📚
            </div>

            <h2>My Quizzes</h2>

            <p>
              View and manage your posted quizzes.
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/instructor/quizzes");
              }}
            >
              View My Quizzes →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;