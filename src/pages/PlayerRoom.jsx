import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc, increment, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

export default function PlayerRoom() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const playerId = localStorage.getItem(`player_${quizId}`);
  const playerName = localStorage.getItem(`playerName_${quizId}`);

  useEffect(() => {
    if (!quizId) return;

    // 1. Listen to global quiz state
    const unsubQuiz = onSnapshot(doc(db, "quizzes", quizId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuiz((prev) => {
          if (prev && prev.currentQuestionIndex !== data.currentQuestionIndex) {
            setHasAnswered(false);
          }
          return data;
        });
      }
    });

    // 2. Listen to Top 10 Leaderboard for the player screen
    const leaderboardQuery = query(
      collection(db, "quizzes", quizId, "participants"),
      orderBy("score", "desc"),
      limit(10)
    );
    const unsubLeaderboard = onSnapshot(leaderboardQuery, (snap) => {
      setLeaderboard(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubQuiz();
      unsubLeaderboard();
    };
  }, [quizId]);

  if (!quiz) return <div className="p-8 text-center text-[#94a3b8]">Connecting...</div>;

  const handleSelectOption = async (optionIndex) => {
    if (hasAnswered) return;
    setHasAnswered(true);

    const currentQ = quiz.questions[quiz.currentQuestionIndex];
    const isCorrect = currentQ.correctOptionIndex === optionIndex;

    if (isCorrect && playerId) {
      const playerDocRef = doc(db, "quizzes", quizId, "participants", playerId);
      await updateDoc(playerDocRef, {
        score: increment(100)
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-white overflow-y-auto">
      {/* Player Header */}
      <div className="flex justify-between items-center p-4 bg-[#1e293b] border-b border-[#334155] sticky top-0 z-10">
        <span className="font-bold text-[#f8fafc]">{playerName}</span>
        <span className="text-xs uppercase bg-[#0f172a] px-3 py-1 rounded-full text-[#14b8a6] border border-[#334155]">
          {quiz.status}
        </span>
      </div>

      {/* Main Controller Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        
        {/* LOBBY STATE */}
        {quiz.status === "lobby" && (
          <div className="text-center w-full max-w-sm bg-[#1e293b] p-8 rounded-xl border border-[#334155] shadow-xl">
            <div className="w-16 h-16 border-4 border-[#334155] border-t-[#14b8a6] rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">You're in!</h2>
            <p className="text-[#14b8a6] text-lg font-semibold animate-pulse">The quiz will start shortly...</p>
          </div>
        )}

        {/* ACTIVE STATE (Answering Question) */}
        {quiz.status === "active" && !hasAnswered && (
          <div className="flex flex-col w-full h-full max-h-[700px] p-2">
            <div className="mb-6 text-center bg-[#1e293b] p-4 rounded-xl border border-[#334155] shadow-md">
              <span className="text-xs font-bold text-[#14b8a6] uppercase tracking-wider block mb-1">
                Question {quiz.currentQuestionIndex + 1}
              </span>
              <h2 className="text-xl font-bold text-white">
                {quiz.questions[quiz.currentQuestionIndex].questionText}
              </h2>
            </div>

            <div className="w-full flex-1 grid grid-cols-2 gap-4">
              {quiz.questions[quiz.currentQuestionIndex].options.map((optText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`answer-tile tile-${idx} flex flex-col gap-2 p-4`}
                >
                  <span className="text-2xl opacity-80">
                    {idx === 0 && '▲'}
                    {idx === 1 && '◆'}
                    {idx === 2 && '●'}
                    {idx === 3 && '■'}
                  </span>
                  <span className="text-sm font-semibold text-white drop-shadow-md break-words">
                    {optText}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ANSWER SUBMITTED STATE */}
        {quiz.status === "active" && hasAnswered && (
          <div className="text-center bg-[#1e293b] p-8 rounded-xl border border-[#334155] shadow-xl">
            <div className="text-5xl mb-4 animate-bounce">⏳</div>
            <h2 className="text-2xl font-bold">Answer Submitted</h2>
            <p className="text-[#94a3b8] mt-2">Waiting for the host to show results...</p>
          </div>
        )}

        {/* LEADERBOARD STATE */}
        {quiz.status === "leaderboard" && (
          <div className="w-full max-w-md bg-[#1e293b] border border-[#334155] rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-black text-[#14b8a6] text-center mb-6">Live Leaderboard</h2>
            <div className="space-y-3">
              {leaderboard.map((p, rank) => {
                const isMe = p.id === playerId;
                return (
                  <div 
                    key={p.id} 
                    className={`flex justify-between items-center p-4 rounded-lg border ${
                      isMe ? 'bg-[#14b8a6]/20 border-[#14b8a6]' : 'bg-[#0f172a] border-[#334155]'
                    }`}
                  >
                    <span className="font-bold text-white flex items-center">
                      <span className="text-[#14b8a6] w-6 inline-block mr-2">#{rank + 1}</span> 
                      {p.name}
                      {isMe && <span className="ml-2 text-[10px] font-black bg-[#14b8a6] text-slate-900 px-2 py-0.5 rounded-full">YOU</span>}
                    </span>
                    <span className="font-mono text-[#2dd4bf] font-bold">{p.score} pts</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FINISHED STATE */}
        {quiz.status === "finished" && (
          <div className="text-center w-full max-w-md bg-[#1e293b] p-8 rounded-xl border border-[#334155] shadow-xl">
            <h2 className="text-3xl font-black text-[#14b8a6] mb-2">Game Over!</h2>
            <p className="text-[#94a3b8] mb-6">Thanks for playing, {playerName}.</p>
            
            <div className="bg-[#0f172a] p-4 rounded-lg border border-[#334155] text-left">
              <h3 className="text-sm text-[#94a3b8] uppercase font-bold tracking-wider mb-3">Final Standings</h3>
              {leaderboard.slice(0, 3).map((p, rank) => (
                <div key={p.id} className="flex justify-between text-sm py-2 border-b border-[#334155] last:border-0">
                  <span>{rank === 0 ? '🥇' : rank === 1 ? '🥈' : '🥉'} {p.name}</span>
                  <span className="font-mono text-[#2dd4bf]">{p.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}