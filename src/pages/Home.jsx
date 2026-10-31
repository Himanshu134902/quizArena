import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Home() {
  const [pin, setPin] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const q = query(collection(db, "quizzes"), where("roomCode", "==", pin.trim()));
      const snap = await getDocs(q);

      if (snap.empty) {
        setError("Invalid Room PIN. Please check and try again.");
        setLoading(false);
        return;
      }

      const quizDoc = snap.docs[0];
      const quizId = quizDoc.id;

      const playerRef = await addDoc(collection(db, "quizzes", quizId, "participants"), {
        name: nickname.trim(),
        score: 0,
        joinedAt: new Date()
      });

      localStorage.setItem(`player_${quizId}`, playerRef.id);
      localStorage.setItem(`playerName_${quizId}`, nickname.trim());

      navigate(`/play/${quizId}`);
    } catch (err) {
      setError("Failed to join room. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
     <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-[#0f172a]">
        
        {/* The Card Container */}
        <div className="w-full max-w-md bg-[#1e293b] border border-[#334155] rounded-xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Join a Quiz</h1>
            <p className="text-sm text-[#94a3b8]">Enter the 6-digit code provided by your host.</p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-rose-500/20 text-rose-400 rounded-md text-sm text-center border border-rose-500/30">
              {error}
            </div>
          )}
          
          <form onSubmit={handleJoin} className="flex flex-col gap-5">
            <div>
              <input
                type="text"
                required
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Game PIN (e.g. 123456)"
                className="w-full p-4 rounded-lg bg-[#0f172a] border border-[#334155] text-white text-center text-xl tracking-widest placeholder:text-slate-500 focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Your Nickname"
                className="w-full p-4 rounded-lg bg-[#0f172a] border border-[#334155] text-white text-center text-lg placeholder:text-slate-500 focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 mt-2 bg-[#14b8a6] hover:bg-[#0d9488] text-slate-900 font-bold text-lg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Joining..." : "Enter Game"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/create" className="text-sm text-[#14b8a6] hover:text-[#0d9488] transition-colors underline underline-offset-4">
              Want to host your own quiz?
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}