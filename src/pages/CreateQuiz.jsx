import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0, timeLimit: 15 }
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctOptionIndex: 0, timeLimit: 15 }]);
  };

  const handleSaveQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const docRef = await addDoc(collection(db, "quizzes"), {
        title,
        roomCode: pin,
        status: "lobby",
        currentQuestionIndex: 0,
        questions,
        createdAt: new Date()
      });
      navigate(`/host/${docRef.id}`);
    } catch (err) {
      console.error("Error creating quiz:", err);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 min-h-[calc(100vh-4rem)]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Create New Quiz</h1>
          <p className="text-[#94a3b8] text-sm mt-1">Configure your questions and launch the live lobby.</p>
        </div>

        <form onSubmit={handleSaveQuiz} className="flex flex-col gap-6">
          <Card>
            <label className="block text-sm font-semibold mb-2 text-[#94a3b8]">Quiz Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-md bg-[#0f172a] border border-[#334155] text-white focus:outline-none focus:border-[#14b8a6]"
              placeholder="e.g. Frontend Engineering Trivia"
            />
          </Card>

          {questions.map((q, qIdx) => (
            <Card key={qIdx} className="border-[#334155]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-[#14b8a6]">Question {qIdx + 1}</h3>
              </div>
              <input
                type="text"
                required
                value={q.questionText}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[qIdx].questionText = e.target.value;
                  setQuestions(updated);
                }}
                placeholder="Type your question here..."
                className="w-full p-3 mb-4 rounded-md bg-[#0f172a] border border-[#334155] text-white focus:outline-none focus:border-[#14b8a6]"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-3 p-3 rounded-md bg-[#0f172a] border border-[#334155]">
                    <input
                      type="radio"
                      name={`correct_${qIdx}`}
                      checked={q.correctOptionIndex === optIdx}
                      onChange={() => {
                        const updated = [...questions];
                        updated[qIdx].correctOptionIndex = optIdx;
                        setQuestions(updated);
                      }}
                      className="w-4 h-4 accent-[#14b8a6]"
                    />
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[qIdx].options[optIdx] = e.target.value;
                        setQuestions(updated);
                      }}
                      placeholder={`Option ${['A', 'B', 'C', 'D'][optIdx]}`}
                      className="w-full bg-transparent border-none text-white focus:outline-none text-sm"
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={handleAddQuestion} className="flex-1">
              + Add Question
            </Button>
            <Button type="submit" variant="primary" disabled={loading} className="flex-1">
              {loading ? "Generating PIN..." : "Create & Launch Lobby"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}