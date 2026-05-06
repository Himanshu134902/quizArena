import { useState } from "react";
import { auth, database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        await set(ref(database, "users/" + userCred.user.uid), {
          username,
          email,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/quiz");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="auth auth-premium">
      <style>{`
        .auth-premium {
          min-height: calc(100vh - 64px);
          padding: 48px 20px;
          box-sizing: border-box;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #f8fafc;
        }

        .auth-premium .auth-card {
          width: min(100%, 420px);
          padding: 42px;
          border-radius: 28px;
          background: rgba(15, 23, 42, 0.68);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 28px 90px rgba(2, 6, 23, 0.72), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .auth-premium .auth-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(32px, 5vw, 42px);
          line-height: 0.98;
          font-weight: 900;
          letter-spacing: -0.055em;
        }

        .auth-premium .auth-sub {
          margin: 12px 0 22px;
          color: #cbd5e1;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        .auth-premium input {
          font: inherit;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 15px 16px;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(148, 163, 184, 0.18);
        }

        .auth-premium input::placeholder {
          color: #64748b;
          font-weight: 600;
        }

        .auth-premium input:focus {
          border-color: rgba(167, 139, 250, 0.72);
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.16), 0 16px 40px rgba(2, 6, 23, 0.32);
        }

        .auth-premium .auth-btn {
          margin-top: 12px;
          padding: 15px 18px;
          border-radius: 16px;
          font: inherit;
          font-size: 14px;
          font-weight: 850;
          letter-spacing: 0.035em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #4f46e5, #7c3aed 55%, #a855f7);
          box-shadow: 0 20px 52px rgba(79, 70, 229, 0.35);
        }

        .auth-premium .auth-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 26px 70px rgba(124, 58, 237, 0.44);
        }

        .auth-premium .auth-toggle {
          margin: 4px auto 0;
          width: fit-content;
          padding: 10px 14px;
          border-radius: 999px;
          color: #c7d2fe;
          font-size: 13px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0.01em;
          border: 1px solid transparent;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
        }

        .auth-premium .auth-toggle:hover {
          color: #ffffff;
          text-decoration: none;
          background: rgba(99, 102, 241, 0.16);
          border-color: rgba(199, 210, 254, 0.28);
          box-shadow: 0 14px 38px rgba(79, 70, 229, 0.2);
          transform: translateY(-2px);
        }

        .auth-premium .auth-toggle:active {
          transform: translateY(0) scale(0.98);
        }

        @media (max-width: 520px) {
          .auth-premium {
            padding: 32px 16px;
          }

          .auth-premium .auth-card {
            padding: 32px 22px;
            border-radius: 24px;
          }
        }
      `}</style>

      <div className="auth-card">
        <h1 className="auth-title">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="auth-sub">
          {isSignup
            ? "Join QuizArena and start competing with sharper focus."
            : "Login to continue your competitive quiz round."}
        </p>

        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="auth-toggle" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "Create new account"}
        </p>
      </div>
    </main>
  );
}

export default Login;
