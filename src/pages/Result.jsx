import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || 0;
  const hasScore = score > 0;

  return (
    <main className="result result-premium">
      <style>{`
        .result-premium {
          min-height: calc(100vh - 64px);
          padding: 56px 20px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #f8fafc;
        }

        .result-premium::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(720px at 18% 12%, rgba(99, 102, 241, 0.32), transparent 62%),
            radial-gradient(620px at 86% 78%, rgba(168, 85, 247, 0.22), transparent 58%),
            linear-gradient(135deg, #020617 0%, #0f172a 48%, #111827 100%);
        }

        .result-premium::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.68), transparent 76%);
        }

        .result-premium .result-card {
          width: min(100%, 470px);
          padding: 44px;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(15, 23, 42, 0.68);
          backdrop-filter: blur(24px);
          box-shadow: 0 30px 95px rgba(2, 6, 23, 0.74), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          animation: resultFadeUp 650ms ease both;
        }

        .result-premium .result-eyebrow {
          margin: 0 auto 16px;
          width: fit-content;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(199, 210, 254, 0.22);
          background: rgba(99, 102, 241, 0.12);
          color: #c7d2fe;
          font-size: 12px;
          line-height: 1;
          font-weight: 850;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .result-premium .result-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(34px, 7vw, 52px);
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .result-premium .result-score {
          margin: 34px auto 28px;
          padding: 28px;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background:
            radial-gradient(circle at 50% 0%, rgba(167, 139, 250, 0.22), transparent 56%),
            rgba(2, 6, 23, 0.42);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .result-premium .result-score span {
          display: block;
          color: #a5b4fc;
          font-size: 12px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .result-premium .result-score h2 {
          margin: 12px 0 0;
          color: #ffffff;
          font-size: clamp(64px, 16vw, 104px);
          line-height: 0.9;
          font-weight: 950;
          letter-spacing: -0.07em;
          text-shadow: 0 24px 70px rgba(124, 58, 237, 0.28);
        }

        .result-premium .result-message {
          max-width: 340px;
          margin: 0 auto 28px;
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.7;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-wrap: balance;
        }

        .result-premium .result-actions {
          display: grid;
          gap: 12px;
        }

        .result-premium .result-btn {
          width: 100%;
          margin: 0;
          padding: 15px 18px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font: inherit;
          font-size: 14px;
          line-height: 1;
          font-weight: 850;
          letter-spacing: 0.035em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease, color 180ms ease;
        }

        .result-premium .result-btn.primary {
          color: #ffffff;
          background: linear-gradient(135deg, #4f46e5, #7c3aed 55%, #a855f7);
          box-shadow: 0 20px 52px rgba(79, 70, 229, 0.35);
        }

        .result-premium .result-btn.secondary {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.065);
          backdrop-filter: blur(18px);
        }

        .result-premium .result-btn:hover {
          transform: translateY(-3px);
          border-color: rgba(199, 210, 254, 0.34);
        }

        .result-premium .result-btn.primary:hover {
          box-shadow: 0 26px 70px rgba(124, 58, 237, 0.44);
        }

        .result-premium .result-btn.secondary:hover {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.16);
          box-shadow: 0 16px 42px rgba(79, 70, 229, 0.18);
        }

        .result-premium .result-btn:active {
          transform: translateY(0) scale(0.99);
        }

        @keyframes resultFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 520px) {
          .result-premium {
            padding: 36px 16px;
          }

          .result-premium .result-card {
            padding: 34px 22px;
            border-radius: 26px;
          }

          .result-premium .result-score {
            padding: 24px 18px;
          }
        }
      `}</style>

      <div className="result-card">
        <p className="result-eyebrow">Round Complete</p>

        <h1 className="result-title">
          {hasScore ? "Strong Finish" : "Quiz Completed"}
        </h1>

        <div className="result-score">
          <span>Your Score</span>
          <h2>{score}</h2>
        </div>

        <p className="result-message">
          {hasScore
            ? "Great effort. Keep pushing your pace and climb higher on the leaderboard."
            : "Good start. Replay the round, sharpen your timing, and improve your score."}
        </p>

        <div className="result-actions">
          <button
            className="result-btn primary"
            onClick={() => navigate("/leaderboard")}
          >
            View Leaderboard
          </button>

          <button
            className="result-btn secondary"
            onClick={() => navigate("/quiz")}
          >
            Play Again
          </button>
        </div>
      </div>
    </main>
  );
}

export default Result;
