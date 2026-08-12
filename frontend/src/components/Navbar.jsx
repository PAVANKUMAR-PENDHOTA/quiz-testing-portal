import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  if (!user) {
    return null;
  }

  const isInstructor =
    user.role === "instructor";

  return (
    <nav className="navbar">

      <div
        className="navbar-brand"
        onClick={() =>
          navigate(
            isInstructor
              ? "/instructor"
              : "/quizzes"
          )
        }
      >
        <div className="navbar-logo">
          Q
        </div>

        <span>Quiz Portal</span>
      </div>

      <div className="navbar-links">

        {isInstructor ? (
          <>
            <button
              onClick={() =>
                navigate("/instructor")
              }
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                navigate("/instructor/quizzes")
              }
            >
              My Quizzes
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() =>
                navigate("/quizzes")
              }
            >
              Available Quizzes
            </button>

            <button
              onClick={() =>
                navigate("/attempt-history")
              }
            >
              My History
            </button>
          </>
        )}

      </div>

      <div className="navbar-user">

        <div className="navbar-user-info">
          <strong>
            {user.name}
          </strong>

          <span>
            {isInstructor
              ? "Instructor"
              : "Student"}
          </span>
        </div>

        <button
          className="navbar-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;
