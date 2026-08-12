import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    login,
    user,
    loading: authLoading,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, don't show login page
  useEffect(() => {
    if (!authLoading && user) {
      navigate("/quizzes", {
        replace: true,
      });
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const data = await login(
        formData.email,
        formData.password
      );
      if (data?.user) {
        if (data.user.role === "instructor") {
          navigate("/instructor", {
            replace: true,
          });
        } else {
          navigate("/student", {
            replace: true,
          });
        }
      }
    } catch (error) {
      setError(
        error.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="login-page">
        <div className="login-loading">
          Checking authentication...
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <div className="login-logo">
            Q
          </div>

          <h1>Quiz Portal</h1>

          <p>
            Login to continue to your
            assessment portal
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />

          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </button>

        </form>

        <div className="login-footer">
          <p>
            Interactive Quiz & Testing Portal
          </p>
        </div>

      </div>

    </div>
  );
};

export default Login;