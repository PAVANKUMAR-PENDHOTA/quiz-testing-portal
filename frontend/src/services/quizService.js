const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

export const getQuizzes = async () => {
  const response = await fetch(
    `${API_URL}/quizzes`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch quizzes"
    );
  }

  return data;
};

export const getStudentQuiz = async (quizId) => {
  const response = await fetch(
    `${API_URL}/quizzes/student/${quizId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch quiz"
    );
  }

  return data;
};

export const submitQuiz = async (
  quizId,
  answers
) => {
  const response = await fetch(
    `${API_URL}/attempts`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify({
        quizId,
        answers,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to submit quiz"
    );
  }

  return data;
};

export const getMyAttempts = async () => {
  const response = await fetch(
    `${API_URL}/attempts/my-attempts`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch attempt history"
    );
  }

  return data;
};

export const getLeaderboard = async (quizId) => {
  const response = await fetch(
    `${API_URL}/attempts/leaderboard/${quizId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch leaderboard"
    );
  }

  return data;
};


export const getQuizAnalytics = async (quizId) => {
  const response = await fetch(
    `${API_URL}/attempts/analytics/${quizId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch quiz analytics"
    );
  }

  return data;
};
