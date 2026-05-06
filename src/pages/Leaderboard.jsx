import { useEffect, useMemo, useState } from "react";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../firebase";
import Navbar from "../components/Navbar";

const formatTimeTaken = (seconds) => {
  if (typeof seconds !== "number") return "Time unavailable";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) return `${remainingSeconds}s`;
  return `${minutes}m ${remainingSeconds}s`;
};

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const scoresRef = ref(database, "scores");

    const unsubscribe = onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.values(data);
        list.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (a.timeTaken ?? Number.POSITIVE_INFINITY) - (b.timeTaken ?? Number.POSITIVE_INFINITY);
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

  const currentUserKeys = useMemo(
    () =>
      [
        currentUsername,
        auth.currentUser?.email,
        auth.currentUser?.uid,
        auth.currentUser?.displayName,
      ]
        .filter(Boolean)
        .map((value) => value.toLowerCase()),
    [currentUsername],
  );

  const isCurrentUser = (user) =>
    currentUserKeys.includes(String(user.username || "").toLowerCase());

  const top3 = scores.slice(0, 3);
  const others = scores.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean);

  return (
    <>
      <Navbar />

      <main className="leaderboard leaderboard-premium">
        <style>{`
          .leaderboard-premium {
            width: min(100% - 32px, 900px);
            margin: 88px auto 56px;
            padding: 0;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: #f8fafc;
          }

          .leaderboard-premium .leaderboard-eyebrow {
            margin: 0 auto 14px;
            width: fit-content;
            padding: 8px 14px;
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

          .leaderboard-premium .leaderboard-title {
            margin: 0 0 12px;
            color: #ffffff;
            text-align: center;
            font-size: clamp(42px, 7vw, 72px);
            line-height: 0.92;
            font-weight: 900;
            letter-spacing: -0.055em;
          }

          .leaderboard-premium .leaderboard-subtitle {
            max-width: 560px;
            margin: 0 auto 44px;
            color: #cbd5e1;
            text-align: center;
            font-size: 16px;
            line-height: 1.7;
            font-weight: 500;
            letter-spacing: -0.01em;
          }

          .leaderboard-premium .podium {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            align-items: end;
            gap: 18px;
            margin-bottom: 36px;
          }

          .leaderboard-premium .podium-card,
          .leaderboard-premium .leaderboard-item,
          .leaderboard-premium .leaderboard-empty-card {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(15, 23, 42, 0.64);
            backdrop-filter: blur(20px);
            box-shadow: 0 24px 70px rgba(2, 6, 23, 0.42);
          }

          .leaderboard-premium .podium-card {
            width: auto;
            min-height: 150px;
            padding: 22px 18px;
            border-radius: 26px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
            transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          }

          .leaderboard-premium .podium-card:hover {
            transform: translateY(-6px);
            border-color: rgba(199, 210, 254, 0.32);
          }

          .leaderboard-premium .rank-0 {
            min-height: 178px;
            border-color: rgba(250, 204, 21, 0.34);
            box-shadow: 0 24px 70px rgba(250, 204, 21, 0.12), 0 24px 70px rgba(2, 6, 23, 0.46);
          }

          .leaderboard-premium .rank-1 {
            border-color: rgba(226, 232, 240, 0.24);
          }

          .leaderboard-premium .rank-2 {
            border-color: rgba(251, 146, 60, 0.26);
          }

          .leaderboard-premium .is-current-user {
            border-color: rgba(167, 139, 250, 0.82);
            background: linear-gradient(135deg, rgba(79, 70, 229, 0.28), rgba(168, 85, 247, 0.16));
            box-shadow: 0 20px 62px rgba(124, 58, 237, 0.28);
          }

          .leaderboard-premium .rank {
            margin: 0;
            color: #ffffff;
            font-size: 15px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .leaderboard-premium .podium-rank-number {
            color: #c7d2fe;
            font-size: 13px;
            font-weight: 850;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .leaderboard-premium .name {
            margin: 0;
            min-width: 0;
            color: #ffffff;
            font-size: 17px;
            line-height: 1.25;
            font-weight: 850;
            letter-spacing: -0.035em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .leaderboard-premium .score {
            color: #a5b4fc;
            font-size: 14px;
            line-height: 1;
            font-weight: 800;
            letter-spacing: -0.01em;
          }

          .leaderboard-premium .time-taken {
            color: #94a3b8;
            font-size: 12px;
            line-height: 1;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .leaderboard-premium .podium-meta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
          }

          .leaderboard-premium .you-badge {
            width: fit-content;
            margin: 4px auto 0;
            padding: 6px 10px;
            border-radius: 999px;
            color: #ffffff;
            background: rgba(124, 58, 237, 0.34);
            border: 1px solid rgba(199, 210, 254, 0.26);
            font-size: 11px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .leaderboard-premium .leaderboard-list {
            display: grid;
            gap: 16px;
          }

          .leaderboard-premium .leaderboard-item {
            min-height: 70px;
            padding: 18px 22px;
            border-radius: 22px;
            display: grid;
            grid-template-columns: 56px minmax(0, 1fr) auto auto;
            align-items: center;
            gap: 18px;
            transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
          }

          .leaderboard-premium .leaderboard-item:hover {
            transform: translateY(-3px);
            border-color: rgba(199, 210, 254, 0.3);
            background: rgba(30, 41, 59, 0.72);
          }

          .leaderboard-premium .leaderboard-item.is-current-user {
            grid-template-columns: 56px minmax(0, 1fr) auto auto auto;
          }

          .leaderboard-premium .position {
            color: #c7d2fe;
            font-size: 13px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: 0.08em;
          }

          .leaderboard-premium .leaderboard-empty-card {
            width: min(100%, 460px);
            margin: 90px auto 0;
            padding: 36px 28px;
            border-radius: 28px;
            text-align: center;
          }

          .leaderboard-premium .leaderboard-empty-card h1 {
            margin: 0;
            color: #ffffff;
            font-size: 32px;
            line-height: 1;
            font-weight: 900;
            letter-spacing: -0.045em;
          }

          .leaderboard-premium .leaderboard-empty-card p {
            margin: 12px 0 0;
            color: #94a3b8;
            font-size: 15px;
            line-height: 1.65;
            font-weight: 500;
          }

          @media (max-width: 720px) {
            .leaderboard-premium {
              width: min(100% - 24px, 900px);
              margin-top: 72px;
            }

            .leaderboard-premium .podium {
              grid-template-columns: 1fr;
            }

            .leaderboard-premium .rank-0 {
              min-height: 150px;
            }

            .leaderboard-premium .leaderboard-item,
            .leaderboard-premium .leaderboard-item.is-current-user {
              grid-template-columns: 42px minmax(0, 1fr) auto;
            }

            .leaderboard-premium .leaderboard-item .time-taken {
              grid-column: 2 / -1;
              justify-self: start;
            }

            .leaderboard-premium .leaderboard-item .you-badge {
              grid-column: 2 / -1;
              margin: 0;
            }
          }
        `}</style>

        {scores.length === 0 ? (
          <section className="leaderboard-empty-card">
            <h1>Leaderboard</h1>
            <p>Loading the latest competition rankings.</p>
          </section>
        ) : (
          <>
            <p className="leaderboard-eyebrow">Live Rankings</p>
            <h1 className="leaderboard-title">Leaderboard</h1>
            <p className="leaderboard-subtitle">
              Track the strongest competitors, compare your score, and keep climbing round after round.
            </p>

            <section className="podium" aria-label="Top three players">
              {podiumOrder.map((user) => {
                const index = top3.indexOf(user);
                const current = isCurrentUser(user);

                return (
                  <article
                    key={`${user.username}-${index}`}
                    className={`podium-card rank-${index} ${current ? "is-current-user" : ""}`}
                  >
                    <div className="rank">{index === 0 ? "Champion" : "Podium"}</div>
                    <div className="podium-rank-number">Rank {index + 1}</div>
                    <div className="name" title={user.username}>
                      {user.username}
                    </div>
                    <div className="podium-meta">
                      <span className="score">{user.score} pts</span>
                      <span className="time-taken">{formatTimeTaken(user.timeTaken)}</span>
                    </div>
                    {current && <span className="you-badge">You</span>}
                  </article>
                );
              })}
            </section>

            <section className="leaderboard-list" aria-label="Remaining players">
              {others.map((user, index) => {
                const current = isCurrentUser(user);

                return (
                  <article
                    key={`${user.username}-${index}`}
                    className={`leaderboard-item ${current ? "is-current-user" : ""}`}
                  >
                    <span className="position">#{index + 4}</span>
                    <span className="name" title={user.username}>
                      {user.username}
                    </span>
                    <span className="score">{user.score} pts</span>
                    <span className="time-taken">{formatTimeTaken(user.timeTaken)}</span>
                    {current && <span className="you-badge">You</span>}
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
