import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { ref, get } from "firebase/database";

function ProtectedRoute({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [alreadyAttempted, setAlreadyAttempted] =
    useState(false);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {

        setUser(currentUser);

        // 🔥 CHECK ATTEMPT
        if (currentUser?.uid) {

          const attemptRef = ref(
            database,
            "attempts/" + currentUser.uid
          );

          const snap = await get(attemptRef);

          if (snap.exists()) {

            setAlreadyAttempted(true);

          }

        }

        setLoading(false);

      }
    );

    return () => unsubscribe();

  }, []);

  // 🔥 LOADING
  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "22px",
          fontWeight: "700",
        }}
      >
        Checking Competition Access...
      </div>
    );

  }

  // 🔥 NOT LOGGED IN
  if (!user) {

    return <Navigate to="/login" />;

  }

  // 🔥 ALREADY ATTEMPTED
  if (alreadyAttempted) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            width: "500px",
            maxWidth: "100%",
            padding: "40px",
            borderRadius: "28px",

            background: "rgba(15,23,42,0.75)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            backdropFilter: "blur(20px)",

            textAlign: "center",

            color: "white",

            boxShadow:
              "0 30px 80px rgba(0,0,0,0.7)",
          }}
        >

          <h1
            style={{
              fontSize: "42px",
              marginBottom: "15px",
            }}
          >
            Attempt Already Used
          </h1>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            You have already participated in the
            competition. Multiple attempts are not
            allowed in MIB.
          </p>

        </div>
      </div>

    );

  }

  return children;
}

export default ProtectedRoute;