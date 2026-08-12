import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getQuizAnalytics,
} from "../services/quizService";

import "./QuizAnalytics.css";

const QuizAnalytics = () => {
  const { quizId } = useParams();

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response =
          await getQuizAnalytics(quizId);

        setData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [quizId]);

  if (loading) {
    return (
      <div className="analytics-status">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-status error">
        {error}
      </div>
    );
  }

  const analytics = data.analytics;

  return (
    <div className="analytics-page">

      <div className="analytics-container">

        <div className="analytics-header">
          <h1>
            {data.quiz.title}
          </h1>

          <p>
            Instructor Performance
            Analytics
          </p>
        </div>

        <div className="analytics-grid">

          <div className="analytics-card">
            <span>Total Attempts</span>
            <strong>
              {analytics.totalAttempts}
            </strong>
          </div>

          <div className="analytics-card">
            <span>Average Score</span>
            <strong>
              {analytics.averageScore}
            </strong>
          </div>

          <div className="analytics-card">
            <span>Average Percentage</span>
            <strong>
              {analytics.averagePercentage}%
            </strong>
          </div>

          <div className="analytics-card">
            <span>Highest Score</span>
            <strong>
              {analytics.highestScore}/
              {data.quiz.totalQuestions}
            </strong>
          </div>

          <div className="analytics-card">
            <span>Lowest Score</span>
            <strong>
              {analytics.lowestScore}/
              {data.quiz.totalQuestions}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
};

export default QuizAnalytics;