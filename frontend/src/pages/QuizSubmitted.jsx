const QuizSubmitted = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#f5f7fb",
      }}
    >
      <h1>Quiz Submitted Successfully</h1>

      <p>
        Your answers have been recorded.
      </p>

      <p>
        Detailed evaluation will be available in the next milestone.
      </p>
    </div>
  );
};

export default QuizSubmitted;