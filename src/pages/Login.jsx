import { useState } from "react";

import { auth } from "../firebase";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/rules");

    } catch (error) {

      alert(
        "Invalid credentials"
      );

    }

  };

  return (
    <main className="auth auth-premium">

      <style>{`

        .auth-premium {

          min-height:
            calc(100vh - 64px);

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 30px 20px;

          box-sizing: border-box;

          font-family:
            Inter,
            ui-sans-serif,
            system-ui;

          color: #f8fafc;
        }

        .auth-card {

          width:
            min(100%, 430px);

          padding: 42px;

          border-radius: 28px;

          background:
            rgba(15, 23, 42, 0.72);

          border:
            1px solid rgba(255,255,255,0.08);

          box-shadow:
            0 28px 90px
            rgba(2,6,23,0.72);
        }

        .auth-title {

          margin: 0;

          font-size: 40px;

          font-weight: 900;
        }

        .auth-sub {

          margin:
            12px 0 28px;

          color: #cbd5e1;

          line-height: 1.7;
        }

        .auth-card input {

          width: 100%;

          margin-bottom: 16px;

          padding: 15px 16px;

          border-radius: 16px;

          border:
            1px solid
            rgba(148,163,184,0.18);

          background:
            rgba(15,23,42,0.72);

          color: white;

          font-size: 15px;

          box-sizing: border-box;
        }

        .auth-card input:focus {

          outline: none;

          border-color:
            rgba(167,139,250,0.72);

          box-shadow:
            0 0 0 4px
            rgba(124,58,237,0.16);
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

          transform:
            translateY(-3px);

          box-shadow:
            0 20px 50px
            rgba(124,58,237,0.4);
        }

        .auth-note {

          margin-top: 18px;

          text-align: center;

          color: #94a3b8;

          font-size: 13px;

          line-height: 1.7;
        }

        @media (max-width: 520px) {

          .auth-card {

            padding:
              30px 22px;
          }

          .auth-title {

            font-size: 32px;
          }

        }

      `}</style>

      <div className="auth-card">

        <h1 className="auth-title">
          MIB Login
        </h1>

        <p className="auth-sub">

          Login using the credentials
          provided by the organizers.

        </p>

        {/* EMAIL */}
        <input
          type="email"

          placeholder="Email address"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* PASSWORD */}
        <input
          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {/* BUTTON */}
        <button
          className="auth-btn"

          onClick={handleSubmit}
        >

          Login

        </button>

        <p className="auth-note">

          Only registered participants
          can access the competition.

        </p>

      </div>
    </main>
  );
}

export default Login;