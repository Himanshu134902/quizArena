import { useLocation, useNavigate } from "react-router-dom";

function Result() {

  const location = useLocation();

  const navigate = useNavigate();

  const score =
    location.state?.score || 0;

  const timeTaken =
    location.state?.timeTaken || 0;

  // 🔥 FORMAT TIME
  const formatTime = (seconds) => {

    const mins =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${mins}m ${secs}s`;

  };

  return (
    <main className="result-page">

      <style>{`

        .result-page {

          min-height: calc(100vh - 64px);

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 30px;

          box-sizing: border-box;
        }

        .result-card {

          width: 650px;
          max-width: 100%;

          padding: 45px;

          border-radius: 30px;

          background:
            rgba(15,23,42,0.75);

          border:
            1px solid rgba(255,255,255,0.08);

          backdrop-filter: blur(20px);

          text-align: center;

          color: white;

          box-shadow:
            0 30px 80px rgba(0,0,0,0.7);

          animation:
            resultFade 0.5s ease;
        }

        .result-title {

          margin: 0;

          font-size: 52px;

          font-weight: 900;
        }

        .result-sub {

          margin-top: 14px;

          color: #94a3b8;

          line-height: 1.8;
        }

        .result-stats {

          margin-top: 35px;

          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 18px;
        }

        .stat-box {

          padding: 26px;

          border-radius: 22px;

          background:
            rgba(255,255,255,0.04);

          border:
            1px solid rgba(255,255,255,0.06);
        }

        .stat-label {

          color: #94a3b8;

          font-size: 13px;

          font-weight: 800;

          letter-spacing: 0.1em;

          text-transform: uppercase;
        }

        .stat-value {

          margin-top: 10px;

          font-size: 34px;

          font-weight: 900;
        }

        .leaderboard-btn {

          width: 100%;

          margin-top: 35px;

          padding: 16px;

          border-radius: 18px;

          border: none;

          background:
            linear-gradient(
              135deg,
              #4f46e5,
              #7c3aed
            );

          color: white;

          font-size: 15px;

          font-weight: 800;

          cursor: pointer;

          transition: 0.25s ease;
        }

        .leaderboard-btn:hover {

          transform: translateY(-3px);

          box-shadow:
            0 20px 50px rgba(124,58,237,0.4);
        }

        @keyframes resultFade {

          from {

            opacity: 0;

            transform:
              translateY(20px);

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }

        }

        @media (max-width: 700px) {

          .result-card {

            padding: 30px 22px;
          }

          .result-title {

            font-size: 40px;
          }

          .result-stats {

            grid-template-columns: 1fr;
          }

        }

      `}</style>

      <div className="result-card">

        <h1 className="result-title">
          Quiz Submitted
        </h1>

        <p className="result-sub">
          Your responses have been recorded successfully.
          Final rankings will be determined based on
          score and completion time.
        </p>

        {/* 🔥 STATS */}
        <div className="result-stats">

          <div className="stat-box">

            <div className="stat-label">
              Score
            </div>

            <div className="stat-value">
              {score}
            </div>

          </div>

          <div className="stat-box">

            <div className="stat-label">
              Time Taken
            </div>

            <div className="stat-value">

              {formatTime(timeTaken)}

            </div>

          </div>

        </div>

        {/* 🔥 LEADERBOARD */}
        <button
          className="leaderboard-btn"

          onClick={() =>
            navigate("/leaderboard")
          }
        >

          View Leaderboard

        </button>

      </div>
    </main>
  );
}

export default Result;