import { useEffect, useMemo, useState } from "react";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../firebase";
import Navbar from "../components/Navbar";

const branches = [
  "ALL",
  "CSE",
  "CYBER SECURITY",
  "ECE",
  "EE",
  "IT",
  "MECH",
  "METAL",
  "MINING",
  "CIVIL",
  "CHEM",
  "PRODUCTION",
];

const formatTimeTaken = (seconds) => {
  if (typeof seconds !== "number") return "N/A";

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
};

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const scoresRef = ref(database, "scores");

    const unsubscribe = onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.values(data);

        list.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (a.timeTaken ?? Infinity) - (b.timeTaken ?? Infinity);
        });

        setScores(list);
      } else {
        setScores([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = ref(database, "users/" + auth.currentUser.uid);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentUsername(data?.username || auth.currentUser?.email || "");
    });

    return () => unsubscribe();
  }, []);

  const filteredScores = useMemo(() => {
    if (selectedBranch === "ALL") return scores;
    return scores.filter((score) => score.branch === selectedBranch);
  }, [scores, selectedBranch]);

  const topThree = filteredScores.slice(0, 3);
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);
  const remainingScores = filteredScores.slice(3);

  const isCurrentUser = (user) =>
    String(user.username || "").toLowerCase() ===
    String(currentUsername || "").toLowerCase();

  return (
    <>
      <Navbar />

      <main className="leaderboard-page">
        <style>{`
          .leaderboard-page {
            width: min(100% - 32px, 1040px);
            margin: 92px auto 56px;
            color: #f8fafc;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-synthesis: none;
            text-rendering: geometricPrecision;
          }

          .leaderboard-page,
          .leaderboard-page * {
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          .leaderboard-header {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: end;
            gap: 24px;
            margin-bottom: 34px;
          }

          .leaderboard-kicker {
            margin: 0 0 12px;
            width: fit-content;
            padding: 8px 13px;
            border-radius: 999px;
            border: 1px solid rgba(199, 210, 254, 0.22);
            background: rgba(15, 23, 42, 0.58);
            color: #c7d2fe;
            font-size: 12px;
            line-height: 1;
            font-weight: 850;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }

          .leaderboard-title {
            margin: 0;
            color: #ffffff;
            font-size: clamp(44px, 7vw, 76px);
            line-height: 0.92;
            font-weight: 950;
            letter-spacing: -0.06em;
          }

          .leaderboard-subtitle {
            max-width: 620px;
            margin: 16px 0 0;
            color: #cbd5e1;
            font-size: 16px;
            line-height: 1.7;
            font-weight: 500;
            letter-spacing: -0.01em;
          }

          .branch-filter-wrap {
            display: grid;
            gap: 8px;
            justify-items: start;
          }

          .branch-filter-label {
            color: #94a3b8;
            font-size: 11px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .branch-filter {
            min-width: 220px;
            padding: 14px 16px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(15, 23, 42, 0.72);
            color: #ffffff;
            font: inherit;
            font-size: 14px;
            font-weight: 800;
            letter-spacing: -0.01em;
            cursor: pointer;
            outline: none;
            box-shadow: 0 18px 52px rgba(2, 6, 23, 0.36);
            transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
          }

          .branch-filter:hover,
          .branch-filter:focus {
            border-color: rgba(199, 210, 254, 0.34);
            background: rgba(30, 41, 59, 0.82);
            box-shadow: 0 22px 60px rgba(79, 70, 229, 0.18);
          }

          .podium {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            align-items: end;
            gap: 18px;
            margin-bottom: 28px;
          }

          .podium-card,
          .leaderboard-item,
          .leaderboard-empty {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background:
              linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025)),
              rgba(15, 23, 42, 0.64);
            backdrop-filter: blur(22px);
            box-shadow: 0 26px 80px rgba(2, 6, 23, 0.48);
          }

          .podium-card {
            min-height: 168px;
            padding: 24px 20px;
            border-radius: 28px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 10px;
            overflow: hidden;
            position: relative;
            text-align: center;
            transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          }

          .podium-card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: radial-gradient(260px at 50% 0%, rgba(167, 139, 250, 0.18), transparent 68%);
          }

          .podium-card > * {
            position: relative;
            z-index: 1;
          }

          .podium-card:hover {
            transform: translateY(-6px);
            border-color: rgba(199, 210, 254, 0.34);
            box-shadow: 0 32px 90px rgba(2, 6, 23, 0.58);
          }

          .podium-card.rank-1 {
            min-height: 204px;
            border-color: rgba(250, 204, 21, 0.35);
            box-shadow: 0 28px 90px rgba(250, 204, 21, 0.12), 0 28px 90px rgba(2, 6, 23, 0.5);
          }

          .podium-position {
            color: #c7d2fe;
            font-size: 12px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .podium-name {
            min-width: 0;
            color: #ffffff;
            font-size: 22px;
            line-height: 1.1;
            font-weight: 900;
            letter-spacing: -0.045em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .podium-branch {
            color: #94a3b8;
            font-size: 12px;
            line-height: 1;
            font-weight: 850;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          .podium-metrics {
            display: flex;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
          }

          .metric-pill {
            padding: 8px 10px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(2, 6, 23, 0.38);
            color: #e0e7ff;
            font-size: 12px;
            line-height: 1;
            font-weight: 850;
          }

          .leaderboard-list {
            display: grid;
            gap: 16px;
          }

          .leaderboard-item {
            min-height: 78px;
            padding: 18px 22px;
            border-radius: 24px;
            display: grid;
            grid-template-columns: 64px minmax(0, 1fr) auto auto;
            align-items: center;
            gap: 18px;
            transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
          }

          .leaderboard-item:hover {
            transform: translateY(-3px);
            border-color: rgba(199, 210, 254, 0.32);
            background:
              linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)),
              rgba(30, 41, 59, 0.72);
          }

          .current-user {
            border-color: rgba(167, 139, 250, 0.82);
            background:
              linear-gradient(135deg, rgba(79, 70, 229, 0.28), rgba(168, 85, 247, 0.14)),
              rgba(15, 23, 42, 0.7);
            box-shadow: 0 24px 70px rgba(124, 58, 237, 0.26);
          }

          .rank {
            color: #c7d2fe;
            font-size: 16px;
            line-height: 1;
            font-weight: 950;
            letter-spacing: -0.02em;
          }

          .player-info {
            min-width: 0;
            display: grid;
            gap: 6px;
            text-align: left;
          }

          .player-name {
            min-width: 0;
            color: #ffffff;
            font-size: 18px;
            line-height: 1.15;
            font-weight: 900;
            letter-spacing: -0.035em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .player-branch {
            color: #94a3b8;
            font-size: 12px;
            line-height: 1;
            font-weight: 850;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          .score,
          .time {
            justify-self: end;
            white-space: nowrap;
          }

          .score {
            color: #ffffff;
            font-size: 17px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: -0.025em;
          }

          .time {
            color: #a5b4fc;
            font-size: 13px;
            line-height: 1;
            font-weight: 850;
            letter-spacing: 0.02em;
          }

          .you-badge {
            width: fit-content;
            margin-top: 2px;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(124, 58, 237, 0.34);
            border: 1px solid rgba(199, 210, 254, 0.26);
            color: #ffffff;
            font-size: 10px;
            line-height: 1;
            font-weight: 950;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          .leaderboard-empty {
            padding: 34px 24px;
            border-radius: 28px;
            text-align: center;
            color: #cbd5e1;
            font-size: 16px;
            line-height: 1.6;
            font-weight: 600;
          }

          @media (max-width: 780px) {
            .leaderboard-page {
              width: min(100% - 24px, 1040px);
              margin-top: 78px;
            }

            .leaderboard-header {
              grid-template-columns: 1fr;
              align-items: start;
            }

            .branch-filter {
              width: 100%;
              min-width: 0;
            }

            .podium {
              grid-template-columns: 1fr;
            }

            .podium-card.rank-1 {
              min-height: 168px;
              order: -1;
            }

            .leaderboard-item {
              grid-template-columns: 48px minmax(0, 1fr);
              gap: 14px;
              padding: 18px;
            }

            .score,
            .time {
              grid-column: 2;
              justify-self: start;
            }
          }
        `}</style>

        <section className="leaderboard-header">
          <div>
            <p className="leaderboard-kicker">Live Rankings</p>
            <h1 className="leaderboard-title">Leaderboard</h1>
            <p className="leaderboard-subtitle">
              Scores rank first. Faster completion time breaks ties, so every second matters.
            </p>
          </div>

          <label className="branch-filter-wrap">
            <span className="branch-filter-label">Branch</span>
            <select
              className="branch-filter"
              value={selectedBranch}
              onChange={(event) => setSelectedBranch(event.target.value)}
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </label>
        </section>

        {filteredScores.length === 0 ? (
          <section className="leaderboard-empty">
            No scores yet for this branch. Rankings will appear after the first submission.
          </section>
        ) : (
          <>
            <section className="podium" aria-label="Top three leaderboard positions">
              {podiumOrder.map((user) => {
                const originalIndex = topThree.indexOf(user);
                const current = isCurrentUser(user);

                return (
                  <article
                    key={`${user.username}-${originalIndex}`}
                    className={`podium-card rank-${originalIndex + 1} ${current ? "current-user" : ""}`}
                  >
                    <span className="podium-position">Rank {originalIndex + 1}</span>
                    <span className="podium-name" title={user.username}>
                      {user.username}
                    </span>
                    <span className="podium-branch">{user.branch || "Branch N/A"}</span>
                    <div className="podium-metrics">
                      <span className="metric-pill">{user.score} pts</span>
                      <span className="metric-pill">{formatTimeTaken(user.timeTaken)}</span>
                    </div>
                    {current && <span className="you-badge">You</span>}
                  </article>
                );
              })}
            </section>

            <section className="leaderboard-list" aria-label="Leaderboard positions">
              {remainingScores.map((user, index) => {
                const current = isCurrentUser(user);

                return (
                  <article
                    key={`${user.username}-${index}`}
                    className={`leaderboard-item ${current ? "current-user" : ""}`}
                  >
                    <div className="rank">#{index + 4}</div>

                    <div className="player-info">
                      <div className="player-name" title={user.username}>
                        {user.username}
                      </div>
                      <div className="player-branch">{user.branch || "Branch N/A"}</div>
                      {current && <div className="you-badge">You</div>}
                    </div>

                    <div className="score">{user.score} pts</div>
                    <div className="time">{formatTimeTaken(user.timeTaken)}</div>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default Leaderboard;
