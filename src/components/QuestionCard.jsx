

export default function QuestionCard({ questionNumber, questionText, options = [] }) {
  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className="qcard-wrapper">
      <div className="qcard-header">
        <span className="qcard-number">
          Question {questionNumber}
        </span>
        <h2 className="qcard-title">
          {questionText || "Waiting for question..."}
        </h2>
      </div>

      <div className="qcard-options-grid">
        {options.map((opt, index) => (
          <div key={index} className="qcard-option">
            <span className="qcard-option-label">
              {labels[index]}
            </span>
            {opt || "Option text"}
          </div>
        ))}
      </div>
    </div>
  );
}