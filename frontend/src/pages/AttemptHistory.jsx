import { useEffect, useState } from "react";
import { getMyAttempts } from "../services/quizService";
import "./AttemptHistory.css";

const AttemptHistory = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const data = await getMyAttempts();

        setAttempts(data.attempts || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAttempts();
  }, []);

  if (loading) {
    return (
      <div className="history-status">
        Loading attempt history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-status error">
        {error}
      </div>
    );
  }

  return (
    <div className="history-page">

      <div className="history-container">

        <h1>Attempt History</h1>

        {attempts.length === 0 ? (
          <div className="empty-history">
            <h2>No attempts yet</h2>
            <p>
              Complete a quiz to see your results here.
            </p>
          </div>
        ) : (
          <div className="history-table-wrapper">

            <table className="history-table">

              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Correct</th>
                  <th>Wrong</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {attempts.map((attempt) => (
                  <tr key={attempt._id}>

                    <td>
                      {attempt.quiz?.title ||
                        "Unknown Quiz"}
                    </td>

                    <td>
                      {attempt.score}/
                      {attempt.totalQuestions}
                    </td>

                    <td>
                      {attempt.percentage}%
                    </td>

                    <td className="correct-text">
                      {attempt.correctAnswers}
                    </td>

                    <td className="wrong-text">
                      {attempt.wrongAnswers}
                    </td>

                    <td>
                      {new Date(
                        attempt.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default AttemptHistory;
