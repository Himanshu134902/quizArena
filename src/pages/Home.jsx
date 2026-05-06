import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // 🔥 EVENT START TIME
  const EVENT_TIME = new Date("2026-05-10T18:00:00");

  const [timeLeft, setTimeLeft] = useState("");
  const [isLive, setIsLive] = useState(false);

  // 🔥 COUNTDOWN TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = EVENT_TIME - now;

      if (diff <= 0) {
        setIsLive(true);
        setTimeLeft("LIVE NOW");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${days}d ${hrs}h ${mins}m ${secs}s`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          font-size: clamp(70px, 14vw, 160px);
          line-height: 0.88;
          font-weight: 900;
          letter-spacing: -0.08em;
        }

        .home-title span {
          display: inline-block;
          padding-bottom: 0.08em;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #c7d2fe 32%,
            #a78bfa 62%,
            #f0abfc 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 24px 80px rgba(124, 58, 237, 0.2);
        }

        .mib-fullform {
          margin-top: -12px;
          color: #cbd5e1;
          font-size: clamp(16px, 2vw, 24px);
          font-weight: 700;
          letter-spacing: 0.35em;
        }

        .home-sub {
          max-width: 720px;
          margin: 0 auto;
          color: #cbd5e1;
          font-size: clamp(17px, 2.1vw, 22px);
          font-weight: 500;
          line-height: 1.75;
          letter-spacing: -0.015em;
        }

        .home-timer {
          margin-top: 12px;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 800;
          color: #a78bfa;
          letter-spacing: 0.04em;
        }

        .home-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .home-action {
          min-width: 240px;
          padding: 16px 26px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font: inherit;
          font-size: 15px;
          font-weight: 850;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .home-action.primary {
          color: #ffffff;
          background: linear-gradient(
            135deg,
            #4f46e5,
            #7c3aed 55%,
            #a855f7
          );
          box-shadow: 0 20px 55px rgba(79, 70, 229, 0.36);
        }

        .home-action.primary:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 28px 70px rgba(124, 58, 237, 0.42);
        }

        .disabled-btn {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .disabled-btn:hover {
          transform: none !important;
          box-shadow: none !important;
        }

        .mib-strip {
          width: min(100%, 950px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          animation: homeFadeUp 900ms ease 120ms both;
        }

        .mib-card {
          padding: 24px;
          border-radius: 22px;
          background: rgba(15, 23, 42, 0.58);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 70px rgba(2, 6, 23, 0.42);
          color: #e2e8f0;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.7;
          transition: all 0.2s ease;
        }

        .mib-card:hover {
          transform: translateY(-5px);
          border-color: rgba(167, 139, 250, 0.34);
          background: rgba(30, 41, 59, 0.68);
        }

        .home-footer {
          margin-top: 6px;
          color: #64748b;
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

          .mib-strip {
            grid-template-columns: 1fr;
          }

          .home-action {
            width: 100%;
          }

          .mib-fullform {
            letter-spacing: 0.18em;
            line-height: 1.5;
          }

          .home-footer {
            font-size: 11px;
            line-height: 1.4;
          }
        }
      `}</style>

      <section className="home-shell">

        <p className="home-kicker">
          ISTE BITS PRESENTS
        </p>

        <h1 className="home-title">
          <span>MIB</span>
        </h1>

        <p className="mib-fullform">
          MOST INTELLIGENT BRANCH
        </p>

        <p className="home-sub">
          Compete for your branch. Prove your intelligence.
          Only the sharpest minds rise to the top.
        </p>

        {/* 🔥 TIMER */}
        <div className="home-timer">
          {timeLeft}
        </div>

        <div className="home-actions">
          <button
            className={`home-action primary ${
              !isLive ? "disabled-btn" : ""
            }`}
            disabled={!isLive}
            onClick={() => navigate("/login")}
          >
            {isLive
              ? "Enter Competition"
              : "Competition Starts Soon"}
          </button>
        </div>
      </section>

      <section className="mib-strip">

        <div className="mib-card">
          🧠 Inter-Branch Intelligence Competition
        </div>

        <div className="mib-card">
          ⚡ One Attempt. No Second Chances.
        </div>

        <div className="mib-card">
          ⏱ Speed decides your leaderboard rank.
        </div>

      </section>

      <footer className="home-footer">
        Organized by ISTE BITS
      </footer>
    </main>
  );
}

export default Home;