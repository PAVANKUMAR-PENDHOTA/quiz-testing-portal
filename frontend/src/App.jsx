import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import RoleRoute from "./components/RoleRoute";

import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";

import QuizList from "./pages/QuizList";
import StudentQuiz from "./pages/StudentQuiz";
import QuizResult from "./pages/QuizResult";
import AttemptHistory from "./pages/AttemptHistory";

import Leaderboard from "./pages/Leaderboard";
import QuizAnalytics from "./pages/QuizAnalytics";
import CreateQuiz from "./pages/CreateQuiz";
import InstructorQuizzes from "./pages/InstructorQuizzes";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Routes>

      <Route
  path="/login"
  element={<Login />}
/>

{/* STUDENT DASHBOARD */}
<Route
  path="/student"
  element={
    <RoleRoute role="student">
      <AppLayout>
        <StudentDashboard />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* STUDENT QUIZZES */}
<Route
  path="/quizzes"
  element={
    <RoleRoute role="student">
      <AppLayout>
        <QuizList />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* STUDENT QUIZ */}
<Route
  path="/student/quiz/:id"
  element={
    <RoleRoute role="student">
      <AppLayout>
        <StudentQuiz />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* RESULT */}
<Route
  path="/quiz-result"
  element={
    <RoleRoute role="student">
      <AppLayout>
        <QuizResult />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* HISTORY */}
<Route
  path="/attempt-history"
  element={
    <RoleRoute role="student">
      <AppLayout>
        <AttemptHistory />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* LEADERBOARD */}
<Route
  path="/leaderboard/:quizId"
  element={
    <RoleRoute role="student">
      <AppLayout>
        <Leaderboard />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* INSTRUCTOR DASHBOARD */}
<Route
  path="/instructor"
  element={
    <RoleRoute role="instructor">
      <AppLayout>
        <InstructorDashboard />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* INSTRUCTOR DASHBOARD */}
<Route
  path="/instructor"
  element={
    <RoleRoute role="instructor">
      <AppLayout>
        <InstructorDashboard />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* CREATE QUIZ */}
<Route
  path="/instructor/create-quiz"
  element={
    <RoleRoute role="instructor">
      <AppLayout>
        <CreateQuiz />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* MY QUIZZES */}
<Route
  path="/instructor/quizzes"
  element={
    <RoleRoute role="instructor">
      <AppLayout>
        <InstructorQuizzes />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* INSTRUCTOR ANALYTICS */}
<Route
  path="/quiz-analytics/:quizId"
  element={
    <RoleRoute role="instructor">
      <AppLayout>
        <QuizAnalytics />
      </AppLayout>
    </RoleRoute>
  }
/>

{/* DEFAULT */}
<Route
  path="/"
  element={
    <Navigate
      to="/login"
      replace
    />
  }
/>

<Route
  path="*"
  element={
    <Navigate
      to="/login"
      replace
    />
  }
/>

    </Routes>
  );
};

export default App;
