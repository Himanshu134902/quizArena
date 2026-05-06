import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "./App.css";
import App from "./App.jsx";

// 🔥 ANTI-CHEAT WRAPPER
function SecurityLayer() {

  useEffect(() => {

    // 🚫 RIGHT CLICK
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    // 🚫 KEY SHORTCUTS
    const disableKeys = (e) => {

      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // CTRL+SHIFT+I
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "i"
      ) {
        e.preventDefault();
      }

      // CTRL+SHIFT+J
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "j"
      ) {
        e.preventDefault();
      }

      // CTRL+U
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "u"
      ) {
        e.preventDefault();
      }

      // CTRL+C
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "c"
      ) {
        e.preventDefault();
      }

    };

    document.addEventListener(
      "contextmenu",
      disableRightClick
    );

    document.addEventListener(
      "keydown",
      disableKeys
    );

    return () => {

      document.removeEventListener(
        "contextmenu",
        disableRightClick
      );

      document.removeEventListener(
        "keydown",
        disableKeys
      );

    };

  }, []);

  return <App />;

}

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <SecurityLayer />

  </StrictMode>

);