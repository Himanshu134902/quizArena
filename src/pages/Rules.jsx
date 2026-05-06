import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Rules() {
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(false);

  return (
    <main className="rules-page">

      <style>{`
        .rules-page {
          min-height: calc(100vh - 64px);

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 30px;
          box-sizing: border-box;
        }

        .rules-card {
          width: 700px;
          max-width: 100%;

          padding: 40px;
          border-radius: 28px;

          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(20px);

          border: 1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 30px 80px rgba(0,0,0,0.7);

          animation: fadeRules 0.5s ease;
        }

        .rules-title {
          font-size: 40px;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .rules-sub {
          color: #94a3b8;
          margin-bottom: 35px;
          line-height: 1.7;
        }

        .rules-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .rule-item {
          padding: 18px;
          border-radius: 16px;

          background: rgba(255,255,255,0.04);

          border: 1px solid rgba(255,255,255,0.06);

          color: #e2e8f0;

          line-height: 1.7;
        }

        .warning-box {
          margin-top: 28px;

          padding: 18px;
          border-radius: 16px;

          background: rgba(239,68,68,0.08);

          border: 1px solid rgba(239,68,68,0.2);

          color: #fecaca;

          line-height: 1.7;
        }

        .agreement {
          margin-top: 28px;

          display: flex;
          align-items: center;
          gap: 12px;

          color: #cbd5e1;
        }

        .agreement input {
          width: 18px;
          height: 18px;

          accent-color: #7c3aed;
        }

        .rules-btn {
          width: 100%;
          margin-top: 35px;

          padding: 16px;

          border-radius: 16px;
          border: none;

          background: linear-gradient(
            135deg,
            #4f46e5,
            #7c3aed
          );

          color: white;
          font-size: 16px;
          font-weight: 800;

          cursor: pointer;

          transition: all 0.25s ease;
        }

        .rules-btn:hover {
          transform: translateY(-3px);

          box-shadow:
            0 20px 50px rgba(124,58,237,0.4);
        }

        .rules-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @keyframes fadeRules {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {

          .rules-card {
            padding: 26px;
          }

          .rules-title {
            font-size: 32px;
          }

        }
      `}</style>

      <div className="rules-card">

        <h1 className="rules-title">
          Competition Rules
        </h1>

        <p className="rules-sub">
          Read all instructions carefully before entering the competition.
        </p>

        <div className="rules-list">

          <div className="rule-item">
            🧠 Each participant gets only ONE attempt.
          </div>

          <div className="rule-item">
            ⏱ Questions are timed. Speed affects leaderboard ranking.
          </div>

          <div className="rule-item">
            🚫 Refreshing or leaving the quiz may disqualify your attempt.
          </div>

          <div className="rule-item">
            ⚡ Do not use unfair means during the competition.
          </div>

          <div className="rule-item">
            🏆 Final rankings are based on score + completion time.
          </div>

        </div>

        {/* WARNING */}
        <div className="warning-box">
          ⚠ Any suspicious activity, tab switching,
          impersonation, or unfair practice may lead
          to immediate disqualification.
        </div>

        {/* AGREEMENT */}
        <label className="agreement">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />

          I have read and understood all rules.
        </label>

        {/* BUTTON */}
        <button
          className="rules-btn"
          disabled={!agreed}
          onClick={() => navigate("/quiz")}
        >
          Enter Competition
        </button>

      </div>
    </main>
  );
}

export default Rules;