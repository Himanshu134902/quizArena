import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-premium">
      <style>{`
        .home-premium {
          --bg: #050505;
          --surface: #111111;
          --surface-soft: #181818;
          --text: #f7f7f7;
          --muted: #a3a3a3;
          --line: rgba(255, 255, 255, 0.12);
          --line-strong: rgba(255, 255, 255, 0.22);

          min-height: 100vh;
          padding: 76px 24px 34px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          overflow: hidden;
          position: relative;
          text-align: center;
          background:
            radial-gradient(760px at 50% -10%, rgba(255, 255, 255, 0.12), transparent 58%),
            linear-gradient(180deg, #0b0b0b 0%, var(--bg) 56%, #000000 100%);
          color: var(--text);
          font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
          font-synthesis: none;
          text-rendering: geometricPrecision;
        }

        .home-premium,
        .home-premium * {
          box-sizing: border-box;
          font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
        }

        .home-shell {
          width: min(100%, 1020px);
          display: grid;
          gap: 22px;
          padding: clamp(34px, 5vw, 68px);
          position: relative;
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid var(--line);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.035)),
            var(--surface);
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.45);
          animation: homeFadeUp 700ms ease both;
        }

        .home-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent);
          transform: translateX(-70%);
          animation: homeSheen 1200ms ease 220ms both;
        }

        .home-shell > * {
          position: relative;
          z-index: 1;
        }

        .home-kicker {
          margin: 0 auto;
          width: fit-content;
          padding: 9px 16px;
          border: 1px solid var(--line-strong);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
          font-size: 12px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          backdrop-filter: blur(14px);
        }

        .home-title {
          margin: 0;
          font-size: clamp(68px, 13vw, 152px);
          line-height: 0.86;
          font-weight: 900;
          letter-spacing: -0.075em;
        }

        .home-title span {
          display: inline-block;
          padding-bottom: 0.08em;
          color: var(--text);
        }

        .mib-fullform {
          margin: -2px 0 0;
          color: var(--muted);
          font-size: clamp(13px, 1.7vw, 19px);
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .home-sub {
          max-width: 720px;
          margin: 0 auto;
          color: #d4d4d4;
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 450;
          line-height: 1.68;
          letter-spacing: -0.01em;
          text-wrap: balance;
        }

        .home-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .home-action {
          min-width: 240px;
          padding: 16px 30px;
          border-radius: 999px;
          border: 1px solid transparent;
          font: inherit;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease;
        }

        .home-action.primary {
          color: #050505;
          background: #ffffff;
          box-shadow: 0 16px 42px rgba(255, 255, 255, 0.16);
        }

        .home-action.primary:hover {
          transform: translateY(-3px);
          background: #e5e5e5;
          box-shadow: 0 22px 56px rgba(255, 255, 255, 0.2);
        }

        .mib-strip {
          width: min(100%, 960px);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          animation: homeFadeUp 900ms ease 120ms both;
        }

        .mib-card {
          min-height: 126px;
          padding: 24px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid var(--line);
          box-shadow: 0 18px 54px rgba(0, 0, 0, 0.22);
          color: var(--text);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          text-align: left;
          transition: transform 200ms ease, border-color 200ms ease, background 200ms ease, box-shadow 200ms ease;
        }

        .mib-card:hover {
          transform: translateY(-4px);
          border-color: var(--line-strong);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
        }

        .mib-card-label {
          color: var(--muted);
          font-size: 11px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .mib-card-title {
          color: var(--text);
          font-size: 17px;
          line-height: 1.35;
          font-weight: 750;
          letter-spacing: -0.02em;
        }

        .home-footer {
          margin-top: 6px;
          color: var(--muted);
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

        @keyframes homeSheen {
          from {
            transform: translateX(-70%);
          }
          to {
            transform: translateX(70%);
          }
        }

        @media (max-width: 760px) {
          .home-premium {
            padding: 50px 18px 24px;
            gap: 26px;
          }

          .home-shell {
            gap: 22px;
            padding: 30px 20px;
            border-radius: 24px;
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

        <div className="home-actions">
          <button
            className="home-action primary"
            onClick={() => navigate("/login")}
          >
            Enter Competition
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
