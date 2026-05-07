import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { database, auth } from "../firebase";

import {
  ref,
  push,
  get,
  set,
} from "firebase/database";

import Navbar from "../components/Navbar";

// 🔥 TOTAL QUIZ TIME = 25 MINUTES
const TOTAL_TIME = 25 * 60;

function Quiz() {

  const navigate = useNavigate();

  const hasSavedScore = useRef(false);

  const [questions, setQuestions] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  const [selected, setSelected] =
    useState(null);

  const [score, setScore] =
    useState(0);

  // 🔥 GLOBAL TIMER
  const [timeLeft, setTimeLeft] =
    useState(TOTAL_TIME);

  const active = questions[current];

  // 🔥 FETCH QUESTIONS ONLY ONCE
  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        const qRef = ref(
          database,
          "questions"
        );

        const snap =
          await get(qRef);

        const data = snap.val();

        setQuestions(
          data
            ? Object.values(data)
            : []
        );

      } catch (err) {

        console.log(err);

      }

    };

    fetchQuestions();

  }, []);

  // 🔥 TAB SWITCH DETECTION
  useEffect(() => {

    const handleVisibility = () => {

      if (document.hidden) {

        alert(
          "Tab switching detected. Quiz will be submitted."
        );

        finishQuiz();

      }

    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

    };

  }, [score, timeLeft]);

  // 🔥 GLOBAL TIMER
  useEffect(() => {

    if (!questions.length) return;

    if (timeLeft <= 0) {

      finishQuiz();

      return;

    }

    const timer = setTimeout(() => {

      setTimeLeft((prev) => prev - 1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft, questions.length]);

  // 🔥 FORMAT TIMER
  const formatTime = (seconds) => {

    const mins =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${mins}:${
      secs < 10 ? "0" : ""
    }${secs}`;

  };

  // 🔥 NEXT QUESTION
  const handleNext = () => {

    let updatedScore = score;

    // 🔥 CHECK ANSWER
    if (selected === active.answer) {

      updatedScore += 1;

      setScore(updatedScore);

    }

    setSelected(null);

    // 🔥 LAST QUESTION
    if (
      current === questions.length - 1
    ) {

      finishQuiz(updatedScore);

    } else {

      setCurrent((prev) => prev + 1);

    }

  };

  // 🔥 FINISH QUIZ
  const finishQuiz = async (
    finalScore = score
  ) => {

    if (hasSavedScore.current)
      return;

    hasSavedScore.current = true;

    const user = auth.currentUser;

    let username =
      user?.email || "unknown";

    let branch = "Unknown";

    // 🔥 FETCH USER DATA
    if (user?.uid) {

      const snap = await get(
        ref(
          database,
          "users/" + user.uid
        )
      );

      username =
        snap.val()?.username ||
        username;

      branch =
        snap.val()?.branch ||
        "Unknown";

    }

    // 🔥 TIME TAKEN
    const timeTaken =
      TOTAL_TIME - timeLeft;

    // 🔥 SAVE SCORE
    await push(
      ref(database, "scores"),
      {

        username,
        branch,

        score: finalScore,

        timeTaken,

        createdAt:
          new Date().toISOString(),

      }
    );

    // 🔥 SAVE ATTEMPT
    if (user?.uid) {

      await set(
        ref(
          database,
          "attempts/" + user.uid
        ),
        true
      );

    }

    // 🔥 RESULT PAGE
    navigate("/result", {

      state: {
        score: finalScore,
        timeTaken,
      },

    });

  };

  // 🔥 PROGRESS
  const progress =
    questions.length
      ? (
          ((current + 1) /
            questions.length) *
          100
        )
      : 0;

  // 🔥 LOADING
  if (!active) {

    return (
      <>
        <Navbar />

        <div className="container">

          <h2>
            Loading Questions...
          </h2>

        </div>
      </>
    );

  }

  return (
    <>
      <Navbar />

      <div className="page">

        <div className="arena">

          {/* 🔥 PROGRESS */}
          <div className="progress-wrapper">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          {/* 🔥 CARD */}
          <div className="arena-card">

            {/* 🔥 HEADER */}
            <div className="arena-header">

              <span>

                Question{" "}
                {current + 1}
                {" / "}
                {questions.length}

              </span>

              {/* 🔥 TIMER */}
              <span className="timer">

                ⏱{" "}
                {formatTime(
                  timeLeft
                )}

              </span>

            </div>

            {/* 🔥 QUESTION */}
            <h1 className="arena-question">

              {active.question}

            </h1>

            {/* 🔥 OPTIONS */}
            <div className="arena-options">

              {active.options.map(
                (opt, i) => (

                  <div
                    key={i}

                    onClick={() =>
                      setSelected(opt)
                    }

                    className={`arena-option ${
                      selected === opt
                        ? "selected"
                        : ""
                    }`}
                  >

                    <span className="letter">

                      {String.fromCharCode(
                        65 + i
                      )}

                    </span>

                    {opt}

                  </div>

                )
              )}

            </div>

            {/* 🔥 BUTTON */}
            <button
              className="arena-btn"

              disabled={!selected}

              onClick={handleNext}
            >

              {current ===
              questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}

            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;