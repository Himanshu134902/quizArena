import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const ADMIN_EMAIL = "test1@gmail.com"; // 🔴 CHANGE THIS

function AdminRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Checking access...</h2>;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ Not admin
  if (user.email !== ADMIN_EMAIL) {
    return <h2 style={{ textAlign: "center" }}>Access Denied 🚫</h2>;
  }

  // ✅ Admin access
  return children;
}

export default AdminRoute;