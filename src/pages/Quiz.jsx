import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, auth } from "../firebase";
import { ref, onValue, push, get } from "firebase/database";
import Navbar from "../components/Navbar";

const QUIZ_TIME = 10;

function Quiz() {
  const navigate = useNavigate();
  const finalScoreRef = useRef(0);
  const finalTimeRef = useRef(0);
  const hasSavedScore = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(QUIZ_TIME);
  const [elapsedTime, setElapsedTime] = useState(0);

  // 🔥 FETCH QUESTIONS
  useEffect(() => {
    const qRef = ref(database, "questions");

    const unsubscribe = onValue(qRef, (snap) => {
      const data = snap.val();
      setQuestions(data ? Object.values(data) : []);
    });

    return () => unsubscribe();
  }, []);

  const active = questions[current];

  const handleNext = useCallback(() => {
    const questionTime = QUIZ_TIME - time;
    const nextElapsedTime = elapsedTime + questionTime;
    const nextScore = active && selected === active.answer ? score + 1 : score;

    finalScoreRef.current = nextScore;
    finalTimeRef.current = nextElapsedTime;

    if (active && selected === active.answer) {
      setScore(nextScore);
    }

    setElapsedTime(nextElapsedTime);
    setSelected(null);
    setCurrent((prev) => prev + 1);
    setTime(QUIZ_TIME);
  }, [active, elapsedTime, score, selected, time]);

  // 🔥 TIMER
  useEffect(() => {
    if (!active) return;

    if (time === 0) {
      const t = setTimeout(handleNext, 0);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setTime((p) => p - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [time, active, handleNext]);

  // 🔥 SAVE SCORE
  useEffect(() => {
    if (current === questions.length && questions.length > 0) {
      if (hasSavedScore.current) return;
      hasSavedScore.current = true;

      const save = async () => {
        const user = auth.currentUser;
        let username = user?.email || "unknown";

        if (user?.uid) {
          const snap = await get(ref(database, "users/" + user.uid));
          username = snap.val()?.username || username;
        }

        await push(ref(database, "scores"), {
          username,
          score: finalScoreRef.current,
          timeTaken: finalTimeRef.current,
          createdAt: new Date().toISOString(),
        });

        navigate("/result", { state: { score: finalScoreRef.current } });
      };

      save();
    }
  }, [current, navigate, questions.length]);

  const progress = questions.length
    ? ((current + 1) / questions.length) * 100
    : 0;

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="arena">

          {/* ✅ LOADING handled INSIDE UI */}
          {!active ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {/* PROGRESS */}
              <div className="progress-wrapper">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* CARD */}
              <div className="arena-card">

                <div className="arena-header">
                  <span>
                    Question {current + 1} / {questions.length}
                  </span>
                  <span className="timer">{time}s</span>
                </div>

                <h1 className="arena-question">
                  {active.question}
                </h1>

                <div className="arena-options">
                  {active.options.map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => setSelected(opt)}
                      className={`arena-option ${
                        selected === opt ? "selected" : ""
                      }`}
                    >
                      <span className="letter">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </div>
                  ))}
                </div>

                <button
                  className="arena-btn"
                  disabled={!selected}
                  onClick={handleNext}
                >
                  {current === questions.length - 1 ? "Finish" : "Next"}
                </button>

              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
