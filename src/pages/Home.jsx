import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-premium">
      <style>{`
        .home-premium {
          min-height: calc(100vh - 64px);
          padding: 72px 24px 28px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 56px;
          overflow: hidden;
          position: relative;
          text-align: center;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #f8fafc;
        }

        .home-premium::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(760px at 20% 8%, rgba(99, 102, 241, 0.32), transparent 62%),
            radial-gradient(620px at 88% 76%, rgba(168, 85, 247, 0.22), transparent 58%),
            linear-gradient(135deg, #020617 0%, #0f172a 48%, #111827 100%);
        }

        .home-premium::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent 75%);
        }

        .home-shell {
          width: min(100%, 1040px);
          display: grid;
          gap: 34px;
          animation: homeFadeUp 700ms ease both;
        }

        .home-kicker {
          margin: 0 auto;
          width: fit-content;
          padding: 8px 14px;
          border: 1px solid rgba(199, 210, 254, 0.22);
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.58);
          color: #c7d2fe;
          font-size: 12px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          box-shadow: 0 12px 40px rgba(30, 41, 59, 0.35);
        }

        .home-title {
          margin: 0;
          font-size: clamp(48px, 9vw, 108px);
          line-height: 0.88;
          font-weight: 900;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .home-title span {
          display: inline-block;
          padding-bottom: 0.08em;
          background: linear-gradient(135deg, #ffffff 0%, #c7d2fe 32%, #a78bfa 62%, #f0abfc 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 24px 80px rgba(124, 58, 237, 0.2);
        }

        .home-sub {
          max-width: 650px;
          margin: 0 auto;
          color: #cbd5e1;
          font-size: clamp(17px, 2.1vw, 22px);
          font-weight: 500;
          line-height: 1.65;
          letter-spacing: -0.015em;
          text-wrap: balance;
        }

        .home-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .home-action {
          min-width: 180px;
          padding: 15px 22px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font: inherit;
          font-size: 14px;
          font-weight: 850;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
        }

        .home-action.primary {
          color: #ffffff;
          background: linear-gradient(135deg, #4f46e5, #7c3aed 55%, #a855f7);
          box-shadow: 0 20px 55px rgba(79, 70, 229, 0.36);
        }

        .home-action.secondary {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.065);
          backdrop-filter: blur(18px);
        }

        .home-action:hover {
          transform: translateY(-3px);
          border-color: rgba(199, 210, 254, 0.38);
        }

        .home-action.primary:hover {
          box-shadow: 0 26px 70px rgba(124, 58, 237, 0.44);
        }

        .home-action:active {
          transform: translateY(-1px) scale(0.99);
        }

        .home-stats {
          width: min(100%, 780px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          animation: homeFadeUp 820ms ease 80ms both;
        }

        .home-stat,
        .home-feature {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(15, 23, 42, 0.58);
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 70px rgba(2, 6, 23, 0.42);
        }

        .home-stat {
          padding: 18px 14px;
          border-radius: 22px;
        }

        .home-stat strong {
          display: block;
          color: #ffffff;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .home-stat span {
          display: block;
          margin-top: 8px;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .home-features {
          width: min(100%, 900px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          animation: homeFadeUp 900ms ease 140ms both;
        }

        .home-feature {
          padding: 24px;
          border-radius: 24px;
          text-align: left;
          transition: transform 200ms ease, border-color 200ms ease, background 200ms ease;
        }

        .home-feature:hover {
          transform: translateY(-5px);
          border-color: rgba(167, 139, 250, 0.34);
          background: rgba(30, 41, 59, 0.68);
        }

        .home-feature h3 {
          margin: 0;
          color: #ffffff;
          font-size: 18px;
          line-height: 1.25;
          font-weight: 850;
          letter-spacing: -0.03em;
        }

        .home-feature p {
          margin: 10px 0 0;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.65;
          letter-spacing: -0.01em;
        }

        .home-footer {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 12px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        @keyframes homeFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 760px) {
          .home-premium {
            padding: 50px 18px 24px;
            gap: 38px;
          }

          .home-shell {
            gap: 24px;
          }

          .home-actions,
          .home-stats,
          .home-features {
            grid-template-columns: 1fr;
          }

          .home-action {
            width: 100%;
          }

          .home-feature {
            text-align: center;
          }

          .home-footer {
            font-size: 11px;
            line-height: 1.4;
          }
        }
      `}</style>

      <section className="home-shell" aria-labelledby="home-title">
        <p className="home-kicker">Competitive Quiz Platform</p>

        <h1 className="home-title" id="home-title">
          <span>QuizArena</span>
        </h1>

        <p className="home-sub">
          Train under pressure, answer with precision, and climb a leaderboard built for serious competitors.
        </p>

        <div className="home-actions">
          <button className="home-action primary" onClick={() => navigate("/login")}>
            Start Quiz
          </button>

          <button className="home-action secondary" onClick={() => navigate("/leaderboard")}>
            View Leaderboard
          </button>
        </div>
      </section>

      <section className="home-stats" aria-label="Platform stats">
        <div className="home-stat">
          <strong>1000+</strong>
          <span>Players</span>
        </div>
        <div className="home-stat">
          <strong>5000+</strong>
          <span>Questions Solved</span>
        </div>
        <div className="home-stat">
          <strong>Live</strong>
          <span>Competition</span>
        </div>
      </section>

      <section className="home-features" aria-label="QuizArena features">
        <article className="home-feature">
          <h3>Speed Matters</h3>
          <p>Beat the clock with a clean flow that keeps every question focused.</p>
        </article>

        <article className="home-feature">
          <h3>Real Competition</h3>
          <p>Track your rank and push for a better finish every round.</p>
        </article>

        <article className="home-feature">
          <h3>Sharp Questions</h3>
          <p>Practice with dynamic prompts designed to reward accuracy and pace.</p>
        </article>
      </section>

      <footer className="home-footer">All Rights Reserved @ISTE BITS</footer>
    </main>
  );
}

export default Home;
