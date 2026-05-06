const optionLabels = ["A", "B", "C", "D", "E", "F"];

function QuestionCard({ questionData, selected, onOptionClick }) {
  return (
    <section className="question-card-premium">
      <style>{`
        .question-card-premium {
          width: 100%;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #f8fafc;
        }

        .question-card-premium .question-kicker {
          margin: 0 0 12px;
          color: #c4b5fd;
          font-size: 12px;
          line-height: 1;
          font-weight: 850;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .question-card-premium .question-title {
          margin: 0 0 26px;
          color: #ffffff;
          font-size: clamp(25px, 4vw, 36px);
          line-height: 1.18;
          font-weight: 900;
          letter-spacing: -0.045em;
          text-align: left;
          text-wrap: balance;
        }

        .question-card-premium .question-options {
          display: grid;
          gap: 12px;
        }

        .question-card-premium .question-option {
          width: 100%;
          margin: 0;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(15, 23, 42, 0.62);
          color: #e2e8f0;
          font-family: inherit;
          font-size: 15px;
          line-height: 1.45;
          font-weight: 700;
          letter-spacing: -0.015em;
          text-align: left;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease, color 180ms ease;
        }

        .question-card-premium .question-option:hover {
          transform: translateY(-2px);
          border-color: rgba(199, 210, 254, 0.34);
          background: rgba(99, 102, 241, 0.16);
          color: #ffffff;
          box-shadow: 0 18px 46px rgba(79, 70, 229, 0.2);
        }

        .question-card-premium .question-option:active {
          transform: translateY(0) scale(0.99);
        }

        .question-card-premium .question-option.selected {
          border-color: rgba(167, 139, 250, 0.72);
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.32), rgba(168, 85, 247, 0.2));
          color: #ffffff;
          box-shadow: 0 18px 50px rgba(124, 58, 237, 0.28);
        }

        .question-card-premium .option-letter {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: #c7d2fe;
          font-size: 12px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0;
          transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
        }

        .question-card-premium .question-option:hover .option-letter,
        .question-card-premium .question-option.selected .option-letter {
          border-color: rgba(255, 255, 255, 0.24);
          background: #ffffff;
          color: #312e81;
        }

        .question-card-premium .option-text {
          min-width: 0;
          flex: 1;
        }
      `}</style>

      <p className="question-kicker">Challenge Prompt</p>
      <h2 className="question-title">{questionData.question}</h2>

      <div className="question-options">
        {questionData.options.map((opt, index) => (
          <button
            key={`${opt}-${index}`}
            onClick={() => onOptionClick(opt)}
            className={`question-option ${selected === opt ? "selected" : ""}`}
          >
            <span className="option-letter">{optionLabels[index] || index + 1}</span>
            <span className="option-text">{opt}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuestionCard;
