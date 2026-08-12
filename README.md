# Interactive Quiz & Testing Portal

A full-stack MERN application that allows instructors to create and manage
multiple-choice assessments while students can take timed quizzes,
receive instant results, view their attempt history, and compare
performance through leaderboards.

---

## 🚀 Live Application

Frontend:
https://your-frontend-url.vercel.app

Backend API:
https://your-backend-url.onrender.com

> Replace the above URLs after deployment.

---

## 📌 Project Overview

The Interactive Quiz & Testing Portal is an online assessment platform
built using the MERN stack.

The system provides separate experiences for:

- Students
- Instructors

### Students can:

- Register and login
- View available quizzes
- Start timed quizzes
- Navigate between questions
- Submit answers
- Automatically submit when the timer expires
- Receive instant results
- View detailed performance
- View previous attempts
- View leaderboard rankings
- Logout securely

### Instructors can:

- Register and login
- Access instructor dashboard
- Create quizzes
- Add multiple-choice questions
- Add multiple options
- Select correct answers
- Set quiz duration
- Publish quizzes
- View created quizzes
- View quiz analytics
- Monitor student performance
- Logout securely

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- JavaScript ES6+
- CSS
- Native Fetch API
- React Hooks

## Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcrypt / bcryptjs
- HTTP-only Cookies
- CORS

## Database

- MongoDB
- MongoDB Atlas
- Mongoose

## Development Tools

- VS Code
- Git
- GitHub
- Postman
- npm

## Deployment

- Vercel - Frontend
- Render - Backend
- MongoDB Atlas - Database

---

# 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                         Fetch REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Express.js      │
                    │      REST API       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Mongoose      │
                    │       ODM           │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │      Database       │
                    └─────────────────────┘


Interactive-Quiz-Testing-Portal/
│
├── client/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AttemptHistory.jsx
│   │   │   ├── CreateQuiz.jsx
│   │   │   ├── InstructorDashboard.jsx
│   │   │   ├── InstructorQuizzes.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── QuizAnalytics.jsx
│   │   │   ├── QuizList.jsx
│   │   │   ├── QuizResult.jsx
│   │   │   ├── QuizSubmitted.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── StudentQuiz.jsx
│   │   │
│   │   ├── services/
│   │   │   └── quizService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
├── server/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── quizController.js
│   │   └── attemptController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Quiz.js
│   │   └── Attempt.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── quizRoutes.js
│   │   └── attemptRoutes.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md

Authentication flow:

Login
  ↓
Validate email/password
  ↓
Compare hashed password
  ↓
Generate JWT
  ↓
Store JWT in HTTP-only cookie
  ↓
Authenticated requests
  ↓
protect middleware
  ↓
Fetch user
  ↓
Role authorization

Student access:

Available Quizzes
My History
Quiz Attempt
Results
Leaderboard
Logout

Instructor access:

Dashboard
Create Quiz
My Quizzes
Analytics
Logout