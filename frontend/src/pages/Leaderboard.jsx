import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getLeaderboard,
} from "../services/quizService";

import "./Leaderboard.css";

const Leaderboard = () => {
  const { quizId } = useParams();

  const [leaderboard, setLeaderboard] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data =
          await getLeaderboard(quizId);

        setLeaderboard(
          data.leaderboard || []
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [quizId]);

  if (loading) {
    return (
      <div className="leaderboard-status">
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-status error">
        {error}
      </div>
    );
  }

  return (
    <div className="leaderboard-page">

      <div className="leaderboard-container">

        <div className="leaderboard-header">

          <h1>🏆 Leaderboard</h1>

          <p>
            Top performers for this quiz
          </p>

        </div>

        {leaderboard.length === 0 ? (
          <div className="empty-leaderboard">
            No attempts available yet.
          </div>
        ) : (
          <div className="leaderboard-table-wrapper">

            <table className="leaderboard-table">

              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student</th>
                  <th>Score</th>
                  <th>Percentage</th>
                </tr>
              </thead>

              <tbody>

                {leaderboard.map(
                  (student) => (
                    <tr
                      key={
                        student.studentId
                      }
                    >

                      <td>
                        <span
                          className={`rank rank-${student.rank}`}
                        >
                          {student.rank <= 3
                            ? ["🥇", "🥈", "🥉"][
                                student.rank -
                                  1
                              ]
                            : student.rank}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {
                            student.studentName
                          }
                        </strong>
                      </td>

                      <td>
                        {student.score}/
                        {
                          student.totalQuestions
                        }
                      </td>

                      <td>
                        <strong>
                          {
                            student.percentage
                          }%
                        </strong>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default Leaderboard;