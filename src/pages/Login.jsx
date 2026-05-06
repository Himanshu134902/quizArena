import { useState } from "react";
import { auth, database } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { ref, set } from "firebase/database";

import { useNavigate } from "react-router-dom";

const branches = [
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

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [branch, setBranch] = useState("");

  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {

    try {

      if (isSignup) {

        if (!branch) {
          alert("Please select your branch");
          return;
        }

        const userCred =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        // 🔥 SAVE USER DATA
        await set(
          ref(database, "users/" + userCred.user.uid),
          {
            username,
            email,
            branch,
          }
        );

      } else {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      }

      navigate("/rules");

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

          font-family:
            Inter,
            ui-sans-serif,
            system-ui;

          color: #f8fafc;
        }

        .auth-card {
          width: min(100%, 430px);

          margin: auto;

          padding: 42px;

          border-radius: 28px;

          background:
            rgba(15, 23, 42, 0.68);

          border:
            1px solid rgba(255,255,255,0.1);

          box-shadow:
            0 28px 90px rgba(2,6,23,0.72);
        }

        .auth-title {
          margin: 0;

          font-size: 40px;
          font-weight: 900;
        }

        .auth-sub {
          margin:
            12px 0 24px;

          color: #cbd5e1;

          line-height: 1.7;
        }

        .auth-card input,
        .auth-card select {

          width: 100%;

          margin-bottom: 14px;

          padding: 15px 16px;

          border-radius: 16px;

          border:
            1px solid rgba(148,163,184,0.18);

          background:
            rgba(15,23,42,0.72);

          color: white;

          font-size: 15px;

          box-sizing: border-box;
        }

        .auth-card select {
          cursor: pointer;
        }

        .auth-card input:focus,
        .auth-card select:focus {

          outline: none;

          border-color:
            rgba(167,139,250,0.72);

          box-shadow:
            0 0 0 4px rgba(124,58,237,0.16);
        }

        .auth-btn {

          width: 100%;

          margin-top: 10px;

          padding: 15px;

          border-radius: 16px;

          border: none;

          background:
            linear-gradient(
              135deg,
              #4f46e5,
              #7c3aed,
              #a855f7
            );

          color: white;

          font-size: 15px;
          font-weight: 800;

          cursor: pointer;

          transition: 0.25s ease;
        }

        .auth-btn:hover {

          transform: translateY(-3px);

          box-shadow:
            0 20px 50px rgba(124,58,237,0.4);
        }

        .auth-toggle {

          margin-top: 16px;

          text-align: center;

          color: #c7d2fe;

          cursor: pointer;

          font-size: 14px;
          font-weight: 700;
        }

        .auth-toggle:hover {
          color: white;
        }

        @media (max-width: 520px) {

          .auth-card {
            padding: 30px 22px;
          }

          .auth-title {
            font-size: 32px;
          }

        }
      `}</style>

      <div className="auth-card">

        <h1 className="auth-title">
          {isSignup
            ? "Create Account"
            : "Welcome Back"}
        </h1>

        <p className="auth-sub">
          {isSignup
            ? "Join MIB and compete for your branch."
            : "Login to enter the competition."}
        </p>

        {/* USERNAME */}
        {isSignup && (
          <input
            type="text"
            placeholder="Username"

            value={username}

            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
        )}

        {/* BRANCH */}
        {isSignup && (
          <select
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
          >

            <option value="">
              Select Branch
            </option>

            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}

          </select>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* BUTTON */}
        <button
          className="auth-btn"
          onClick={handleSubmit}
        >

          {isSignup
            ? "Sign Up"
            : "Login"}

        </button>

        {/* TOGGLE */}
        <p
          className="auth-toggle"

          onClick={() =>
            setIsSignup(!isSignup)
          }
        >

          {isSignup
            ? "Already have an account? Login"
            : "Create new account"}

        </p>

      </div>
    </main>
  );
}

export default Login;