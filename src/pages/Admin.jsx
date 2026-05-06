import React, { useState } from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import Navbar from "../components/Navbar";

function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!question || options.some((opt) => opt === "") || !answer) {
      alert("Please fill all fields properly");
      return;
    }

    if (!options.includes(answer)) {
      alert("Answer must match one of the options");
      return;
    }

    const questionsRef = ref(database, "questions");

    push(questionsRef, {
      question,
      options,
      answer,
    });

    alert("✅ Question added!");

    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2 className="admin-title">🧑‍💼 Admin Dashboard</h2>

          {/* Question */}
          <p className="section-title">Question</p>
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {/* Options */}
          <p className="section-title">Options</p>
          {options.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) =>
                handleOptionChange(e.target.value, index)
              }
            />
          ))}

          {/* Answer */}
          <p className="section-title">Correct Answer</p>
          <input
            type="text"
            placeholder="Must match one option"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          {/* Submit */}
          <button className="submit-btn" onClick={handleSubmit}>
            ➕ Add Question
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin;