import { useEffect, useMemo, useState } from "react";

import {
  ref,
  get,
} from "firebase/database";

import {
  auth,
  database,
} from "../firebase";

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

  if (typeof seconds !== "number")
    return "N/A";

  const mins = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return `${mins}m ${secs}s`;

};

function Leaderboard() {

  const [scores, setScores] =
    useState([]);

  const [selectedBranch, setSelectedBranch] =
    useState("ALL");

  const [currentUsername, setCurrentUsername] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // 🔥 FETCH SCORES ONLY ONCE
  useEffect(() => {

    const fetchScores = async () => {

      try {

        const scoresRef = ref(
          database,
          "scores"
        );

        const snapshot = await get(
          scoresRef
        );

        const data = snapshot.val();

        if (data) {

          const list = Object.values(data);

          // 🔥 SORT
          list.sort((a, b) => {

            // Higher score first
            if (b.score !== a.score) {

              return b.score - a.score;

            }

            // Lower time wins
            return (
              (a.timeTaken ?? Infinity) -
              (b.timeTaken ?? Infinity)
            );

          });

          setScores(list);

        } else {

          setScores([]);

        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchScores();

  }, []);

  // 🔥 FETCH CURRENT USER ONLY ONCE
  useEffect(() => {

    const fetchUser = async () => {

      try {

        if (!auth.currentUser)
          return;

        const userRef = ref(
          database,
          "users/" +
            auth.currentUser.uid
        );

        const snapshot = await get(
          userRef
        );

        const data = snapshot.val();

        setCurrentUsername(
          data?.username ||
            auth.currentUser?.email ||
            ""
        );

      } catch (err) {

        console.log(err);

      }

    };

    fetchUser();

  }, []);

  // 🔥 FILTER SCORES
  const filteredScores = useMemo(() => {

    if (selectedBranch === "ALL")
      return scores;

    return scores.filter(
      (s) =>
        s.branch ===
        selectedBranch
    );

  }, [scores, selectedBranch]);

  // 🔥 CHECK CURRENT USER
  const isCurrentUser = (user) =>
    String(user.username)
      .toLowerCase()
      .trim() ===
    String(currentUsername)
      .toLowerCase()
      .trim();

  return (
    <>
      <Navbar />

      <main className="leaderboard-page">

        <style>{`

          .leaderboard-page {

            width: min(100% - 30px, 950px);

            margin: 90px auto 50px;

            color: white;

            font-family:
              Inter,
              sans-serif;
          }

          .leaderboard-header {

            display: flex;

            justify-content: space-between;

            align-items: center;

            gap: 20px;

            margin-bottom: 30px;

            flex-wrap: wrap;
          }

          .leaderboard-title {

            font-size: 52px;

            font-weight: 900;

            margin: 0;
          }

          .leaderboard-sub {

            margin-top: 10px;

            color: #94a3b8;

            line-height: 1.8;
          }

          .branch-filter {

            padding: 14px 18px;

            border-radius: 14px;

            border:
              1px solid rgba(255,255,255,0.1);

            background:
              rgba(15,23,42,0.8);

            color: white;

            font-size: 14px;

            cursor: pointer;
          }

          .leaderboard-list {

            display: flex;

            flex-direction: column;

            gap: 18px;
          }

          .leaderboard-item {

            display: grid;

            grid-template-columns:
              70px
              1fr
              auto
              auto;

            align-items: center;

            gap: 20px;

            padding: 22px;

            border-radius: 22px;

            background:
              rgba(15,23,42,0.7);

            border:
              1px solid rgba(255,255,255,0.08);

            backdrop-filter: blur(20px);

            transition: 0.25s ease;
          }

          .leaderboard-item:hover {

            transform: translateY(-3px);

            border-color:
              rgba(167,139,250,0.3);
          }

          .leaderboard-item.current-user {

            border-color:
              rgba(167,139,250,0.8);

            box-shadow:
              0 20px 50px rgba(124,58,237,0.25);
          }

          .rank {

            font-size: 24px;

            font-weight: 900;

            color: #a78bfa;
          }

          .player-info {

            display: flex;

            flex-direction: column;

            gap: 4px;
          }

          .player-name {

            font-size: 18px;

            font-weight: 800;
          }

          .player-branch {

            color: #94a3b8;

            font-size: 13px;

            font-weight: 700;

            letter-spacing: 0.08em;
          }

          .score {

            font-size: 18px;

            font-weight: 800;

            color: #c4b5fd;
          }

          .time {

            color: #94a3b8;

            font-size: 14px;

            font-weight: 700;
          }

          .you-badge {

            margin-top: 8px;

            width: fit-content;

            padding: 5px 10px;

            border-radius: 999px;

            background:
              rgba(124,58,237,0.3);

            font-size: 11px;

            font-weight: 900;

            letter-spacing: 0.1em;
          }

          .loading {

            text-align: center;

            padding: 80px 0;

            color: #94a3b8;

            font-size: 20px;
          }

          .empty {

            padding: 40px;

            text-align: center;

            color: #94a3b8;

            border-radius: 20px;

            background:
              rgba(15,23,42,0.6);
          }

          @media (max-width: 768px) {

            .leaderboard-title {

              font-size: 38px;
            }

            .leaderboard-item {

              grid-template-columns:
                50px
                1fr;

              gap: 14px;
            }

            .score,
            .time {

              grid-column: 2;
            }

          }

        `}</style>

        {/* HEADER */}
        <div className="leaderboard-header">

          <div>

            <h1 className="leaderboard-title">
              Leaderboard
            </h1>

            <p className="leaderboard-sub">
              Rankings are based on score and completion time.
            </p>

          </div>

          {/* FILTER */}
          <select
            className="branch-filter"

            value={selectedBranch}

            onChange={(e) =>
              setSelectedBranch(
                e.target.value
              )
            }
          >

            {branches.map((branch) => (

              <option
                key={branch}
                value={branch}
              >

                {branch}

              </option>

            ))}

          </select>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="loading">
            Loading leaderboard...
          </div>

        ) : (

          <>

            {/* EMPTY */}
            {filteredScores.length === 0 ? (

              <div className="empty">
                No scores available.
              </div>

            ) : (

              <div className="leaderboard-list">

                {filteredScores.map(
                  (user, index) => {

                    const current =
                      isCurrentUser(user);

                    return (

                      <div
                        key={index}

                        className={`leaderboard-item ${
                          current
                            ? "current-user"
                            : ""
                        }`}
                      >

                        {/* RANK */}
                        <div className="rank">
                          #{index + 1}
                        </div>

                        {/* INFO */}
                        <div className="player-info">

                          <div className="player-name">
                            {user.username}
                          </div>

                          <div className="player-branch">
                            {user.branch}
                          </div>

                          {current && (
                            <div className="you-badge">
                              YOU
                            </div>
                          )}

                        </div>

                        {/* SCORE */}
                        <div className="score">
                          {user.score} pts
                        </div>

                        {/* TIME */}
                        <div className="time">

                          ⏱{" "}

                          {formatTimeTaken(
                            user.timeTaken
                          )}

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            )}

          </>

        )}

      </main>
    </>
  );
}

export default Leaderboard;