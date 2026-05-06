import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../firebase";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = ref(database, "users/" + auth.currentUser.uid);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setUsername(data.username);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const displayName = username || auth.currentUser?.email || "Guest";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="navbar navbar-premium">
      <style>{`
        .navbar-premium {
          height: 72px;
          padding: 0 clamp(18px, 4vw, 44px);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: rgba(2, 6, 23, 0.78);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 16px 50px rgba(2, 6, 23, 0.34);
        }

        .navbar-premium .navbar-left,
        .navbar-premium .navbar-right {
          display: flex;
          align-items: center;
        }

        .navbar-premium .logo {
          margin: 0;
          color: #ffffff;
          font-size: 21px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.045em;
          cursor: pointer;
          transition: color 180ms ease, transform 180ms ease, text-shadow 180ms ease;
        }

        .navbar-premium .logo:hover {
          color: #e0e7ff;
          text-shadow: 0 12px 35px rgba(124, 58, 237, 0.4);
          transform: translateY(-1px);
        }

        .navbar-premium .navbar-right {
          max-width: min(520px, 62vw);
          gap: 12px;
          justify-content: flex-end;
          overflow: visible;
        }

        .navbar-premium .user {
          min-width: 0;
          max-width: 260px;
          height: 40px;
          padding: 0 14px 0 8px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          color: #dbeafe;
          background: rgba(255, 255, 255, 0.055);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 13px;
          line-height: 1;
          font-weight: 750;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, box-shadow 180ms ease, color 180ms ease;
        }

        .navbar-premium .user:hover {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.16);
          border-color: rgba(199, 210, 254, 0.3);
          box-shadow: 0 14px 38px rgba(79, 70, 229, 0.2);
          transform: translateY(-2px);
        }

        .navbar-premium .user-avatar {
          width: 28px;
          height: 28px;
          flex: 0 0 28px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          color: #ffffff;
          background: linear-gradient(135deg, #4f46e5, #a855f7);
          font-size: 12px;
          font-weight: 900;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .navbar-premium .user-name {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .navbar-premium .logout-btn {
          width: auto;
          height: 40px;
          margin: 0;
          padding: 0 16px;
          flex: 0 0 auto;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f8fafc;
          background: rgba(255, 255, 255, 0.06);
          font: inherit;
          font-size: 13px;
          line-height: 1;
          font-weight: 850;
          letter-spacing: 0.015em;
          cursor: pointer;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, box-shadow 180ms ease, color 180ms ease;
        }

        .navbar-premium .logout-btn:hover {
          color: #fecdd3;
          background: rgba(244, 63, 94, 0.13);
          border-color: rgba(251, 113, 133, 0.36);
          box-shadow: 0 14px 38px rgba(244, 63, 94, 0.16);
          transform: translateY(-2px);
        }

        .navbar-premium .logout-btn:active,
        .navbar-premium .user:active {
          transform: translateY(0) scale(0.98);
        }

        @media (max-width: 560px) {
          .navbar-premium {
            height: 68px;
            padding: 0 14px;
            gap: 10px;
          }

          .navbar-premium .logo {
            font-size: 18px;
          }

          .navbar-premium .navbar-right {
            max-width: calc(100vw - 150px);
            gap: 8px;
          }

          .navbar-premium .user {
            max-width: 128px;
            padding-right: 10px;
          }

          .navbar-premium .logout-btn {
            padding: 0 12px;
          }
        }
      `}</style>

      <div className="navbar-left">
        <h2 className="logo" onClick={() => navigate("/")}>
          QuizArena
        </h2>
      </div>

      <div className="navbar-right">
        <span className="user" title={displayName}>
          <span className="user-avatar">{initial}</span>
          <span className="user-name">{displayName}</span>
        </span>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
