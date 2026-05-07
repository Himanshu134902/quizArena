import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EVENT_TIME = new Date("2026-05-10T18:00:00");

function Home() {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState("");
  const [isLive, setIsLive] = useState(false);

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

      setTimeLeft(`${days}d ${hrs}h ${mins}m ${secs}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="home-premium">
      <style>{`
        .home-premium {
          min-height: calc(100vh - 64px);
          padding: 76px 24px 30px;
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
          font-synthesis: none;
          text-rendering: geometricPrecision;
        }

        .home-premium,
        .home-premium * {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .home-premium::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: -2;
          background:
            radial-gradient(780px at 18% 10%, rgba(99, 102, 241, 0.34), transparent 62%),
            radial-gradient(640px at 84% 72%, rgba(168, 85, 247, 0.24), transparent 58%),
            radial-gradient(520px at 50% 100%, rgba(14, 165, 233, 0.12), transparent 62%),
            linear-gradient(135deg, #020617 0%, #0f172a 46%, #111827 100%);
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
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.72), transparent 76%);
        }

        .home-shell {
          width: min(100%, 1040px);
          display: grid;
          gap: 30px;
          padding: clamp(34px, 5vw, 54px);
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          border: 1px solid rgba(255, 255, 255, 0.11);
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.085), rgba(255, 255, 255, 0.03)),
            rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(24px);
          box-shadow:
            0 34px 110px rgba(2, 6, 23, 0.62),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          animation: homeFadeUp 700ms ease both;
        }

        .home-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(430px at 50% 0%, rgba(167, 139, 250, 0.2), transparent 62%),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.07), transparent 36%);
        }

        .home-shell > * {
          position: relative;
          z-index: 1;
        }

        .home-kicker {
          margin: 0 auto;
          width: fit-content;
          padding: 9px 15px;
          border: 1px solid rgba(199, 210, 254, 0.22);
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.58);
          color: #c7d2fe;
          font-size: 12px;
          font-weight: 850;
          line-height: 1;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          box-shadow: 0 12px 40px rgba(30, 41, 59, 0.35);
        }

        .home-title {
          margin: 0;
          font-size: clamp(70px, 14vw, 160px);
          line-height: 0.82;
          font-weight: 950;
          letter-spacing: -0.09em;
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

        .mib-fullform {
          margin: -8px 0 0;
          color: #cbd5e1;
          font-size: clamp(14px, 1.8vw, 21px);
          font-weight: 850;
          line-height: 1.35;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }

        .home-sub {
          max-width: 720px;
          margin: 0 auto;
          color: #dbe3f0;
          font-size: clamp(18px, 2.1vw, 23px);
          font-weight: 500;
          line-height: 1.7;
          letter-spacing: -0.015em;
          text-wrap: balance;
        }

        .home-timer {
          width: fit-content;
          margin: 4px auto 0;
          padding: 16px 22px;
          border-radius: 22px;
          border: 1px solid rgba(199, 210, 254, 0.18);
          background: rgba(2, 6, 23, 0.38);
          color: #ffffff;
          font-size: clamp(23px, 3vw, 36px);
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.025em;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 48px rgba(2, 6, 23, 0.34);
        }

        .home-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .home-action {
          min-width: 240px;
          padding: 17px 28px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font: inherit;
          font-size: 15px;
          font-weight: 850;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease, opacity 180ms ease;
        }

        .home-action.primary {
          color: #ffffff;
          background: linear-gradient(135deg, #4f46e5, #7c3aed 55%, #a855f7);
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
          gap: 18px;
          animation: homeFadeUp 900ms ease 120ms both;
        }

        .mib-card {
          min-height: 118px;
          padding: 24px 22px;
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.58);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 70px rgba(2, 6, 23, 0.42);
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          text-align: left;
          transition: transform 200ms ease, border-color 200ms ease, background 200ms ease, box-shadow 200ms ease;
        }

        .mib-card:hover {
          transform: translateY(-6px);
          border-color: rgba(167, 139, 250, 0.34);
          background: rgba(30, 41, 59, 0.68);
          box-shadow: 0 30px 80px rgba(2, 6, 23, 0.54);
        }

        .mib-card-label {
          color: #c7d2fe;
          font-size: 11px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .mib-card-title {
          color: #ffffff;
          font-size: 17px;
          line-height: 1.35;
          font-weight: 850;
          letter-spacing: -0.025em;
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
            padding: 30px 20px;
            border-radius: 28px;
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

          .mib-card {
            text-align: center;
            min-height: auto;
          }

          .home-footer {
            font-size: 11px;
            line-height: 1.4;
          }
        }
      `}</style>

      <section className="home-shell" aria-labelledby="home-title">
        <p className="home-kicker">ISTE BITS Presents</p>

        <h1 className="home-title" id="home-title">
          <span>MIB</span>
        </h1>

        <p className="mib-fullform">Most Intelligent Branch</p>

        <p className="home-sub">
          Compete for your branch, prove your intelligence, and rise through a live leaderboard built for speed and precision.
        </p>

        <div className="home-timer">{timeLeft}</div>

        <div className="home-actions">
          <button
            className={`home-action primary ${!isLive ? "disabled-btn" : ""}`}
            disabled={!isLive}
            onClick={() => navigate("/login")}
          >
            {isLive ? "Enter Competition" : "Competition Starts Soon"}
          </button>
        </div>
      </section>

      <section className="mib-strip">
        <div className="mib-card">
          <span className="mib-card-label">Format</span>
          <span className="mib-card-title">Inter-branch intelligence competition</span>
        </div>

        <div className="mib-card">
          <span className="mib-card-label">Rules</span>
          <span className="mib-card-title">One attempt. No second chances.</span>
        </div>

        <div className="mib-card">
          <span className="mib-card-label">Ranking</span>
          <span className="mib-card-title">Speed decides your leaderboard rank.</span>
        </div>
      </section>

      <footer className="home-footer">Organized by ISTE BITS</footer>
    </main>
  );
}

export default Home;
