import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <div className="dashboard-welcome">
          <h1>
            Welcome, {user?.name}
          </h1>

          <p>
            Take assessments, check your
            results, and track your
            performance.
          </p>
        </div>

        <div className="dashboard-cards">

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/quizzes")
            }
          >
            <div className="dashboard-card-icon">
              📝
            </div>

            <h2>
              Available Quizzes
            </h2>

            <p>
              View available quizzes and
              start your assessment.
            </p>

            <button>
              View Quizzes →
            </button>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/attempt-history")
            }
          >
            <div className="dashboard-card-icon">
              📊
            </div>

            <h2>
              My History
            </h2>

            <p>
              View your previous quiz
              attempts and results.
            </p>

            <button>
              View History →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
