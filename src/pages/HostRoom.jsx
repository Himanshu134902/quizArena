import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, collection, updateDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Card from "../components/Card";
import QuestionCard from "../components/QuestionCard";

export default function HostRoom() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [topParticipants, setTopParticipants] = useState([]);
  const [recentJoins, setRecentJoins] = useState([]);

  useEffect(() => {
    if (!quizId) return;

    // 1. Listen to global quiz state
    const unsubQuiz = onSnapshot(doc(db, "quizzes", quizId), (docSnap) => {
      if (docSnap.exists()) setQuiz({ id: docSnap.id, ...docSnap.data() });
    });

    // 2. OPTIMIZATION: Only fetch the top 15 players for the leaderboard to save reads and prevent lag
    const leaderboardQuery = query(
      collection(db, "quizzes", quizId, "participants"),
      orderBy("score", "desc"),
      limit(15)
    );
    const unsubLeaderboard = onSnapshot(leaderboardQuery, (snap) => {
      setTopParticipants(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // 3. OPTIMIZATION: Only fetch the 40 most recent players to display in the lobby
    const lobbyQuery = query(
      collection(db, "quizzes", quizId, "participants"),
      orderBy("joinedAt", "desc"),
      limit(40)
    );
    const unsubLobby = onSnapshot(lobbyQuery, (snap) => {
      setRecentJoins(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubQuiz();
      unsubLeaderboard();
      unsubLobby();
    };
  }, [quizId]);

  if (!quiz) return <div className="p-10 text-center text-slate-300">Loading Session...</div>;

  const currentQ = quiz.questions[quiz.currentQuestionIndex];

  const updateQuizStatus = async (status, incrementIndex = false) => {
    const updates = { status };
    if (incrementIndex) updates.currentQuestionIndex = quiz.currentQuestionIndex + 1;
    await updateDoc(doc(db, "quizzes", quizId), updates);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-4rem)] p-6">
        
        {/* Top Info Bar */}
        <div className="flex justify-between items-center bg-[#1e293b] p-4 rounded-xl border border-[#334155] mb-8 shadow-md">
          <div>
            <h1 className="text-xl font-bold text-white">{quiz.title}</h1>
            <p className="text-sm text-teal-400">Live Session Active</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider">Join Code</span>
            <div className="bg-[#0f172a] border border-teal-500 px-6 py-2 rounded-lg text-4xl font-mono font-black text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
              {quiz.roomCode}
            </div>
          </div>
        </div>

        {/* Main Display Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          
          {quiz.status === "lobby" && (
            <div className="text-center w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-white mb-2">Waiting for players...</h2>
              <p className="text-[#94a3b8] mb-8">Showing newest joins</p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {recentJoins.length === 0 && <span className="text-[#94a3b8]">No one is here yet.</span>}
                {recentJoins.map((p) => (
                  <span key={p.id} className="lobby-chip animate-fade-in">{p.name}</span>
                ))}
                {/* Visual indicator that there are more players if we hit the limit */}
                {recentJoins.length >= 40 && <span className="lobby-chip border-dashed border-slate-500 text-slate-400">...and more!</span>}
              </div>
            </div>
          )}

          {quiz.status === "active" && (
            <div className="w-full">
              <QuestionCard 
                questionNumber={quiz.currentQuestionIndex + 1}
                questionText={currentQ.questionText}
                options={currentQ.options}
              />
            </div>
          )}

          {quiz.status === "leaderboard" && (
            <Card className="w-full max-w-xl text-center">
              <h2 className="text-3xl font-black text-teal-400 mb-6">Top 15 Standings</h2>
              <div className="space-y-3">
                {topParticipants.map((p, rank) => (
                  <div key={p.id} className="flex justify-between items-center bg-[#0f172a] p-4 rounded-lg border border-[#334155]">
                    <span className="font-bold text-lg text-white">
                      <span className="text-teal-500 w-6 inline-block mr-2">#{rank + 1}</span> {p.name}
                    </span>
                    <span className="font-mono text-teal-400 font-bold">{p.score} pts</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {quiz.status === "finished" && (
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-4">Quiz Completed!</h2>
              <p className="text-[#94a3b8]">Check the final leaderboard on your devices.</p>
            </div>
          )}
        </div>

        {/* Host Controls */}
        <div className="mt-8 flex justify-end pt-4 border-t border-[#334155]">
          {quiz.status === "lobby" && (
            <Button onClick={() => updateQuizStatus("active")} disabled={recentJoins.length === 0}>
              Start Quiz
            </Button>
          )}
          {quiz.status === "active" && (
            <Button variant="secondary" onClick={() => updateQuizStatus("leaderboard")}>
              Show Leaderboard
            </Button>
          )}
          {quiz.status === "leaderboard" && (
            <Button 
              onClick={() => {
                if (quiz.currentQuestionIndex + 1 < quiz.questions.length) {
                  updateQuizStatus("active", true);
                } else {
                  updateQuizStatus("finished");
                }
              }}
            >
              {quiz.currentQuestionIndex + 1 < quiz.questions.length ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}