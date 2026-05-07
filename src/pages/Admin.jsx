import React, { useState } from "react";

import { database } from "../firebase";

import {
  ref,
  push,
} from "firebase/database";

import Navbar from "../components/Navbar";

const categories = [
  "Aptitude & Reasoning",
  "Current Affairs",
  "Technical",
];

function Admin() {

  const [question, setQuestion] =
    useState("");

  const [options, setOptions] =
    useState(["", "", "", ""]);

  const [answer, setAnswer] =
    useState("");

  const [category, setCategory] =
    useState(categories[0]);

  // 🔥 OPTION CHANGE
  const handleOptionChange = (
    value,
    index
  ) => {

    const updated = [...options];

    updated[index] = value;

    setOptions(updated);

  };

  // 🔥 RESET FORM
  const resetForm = () => {

    setQuestion("");

    setOptions([
      "",
      "",
      "",
      "",
    ]);

    setAnswer("");

    setCategory(
      categories[0]
    );

  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {

    if (
      !question ||
      options.some(
        (opt) => opt.trim() === ""
      ) ||
      !answer
    ) {

      alert(
        "Please fill all fields properly"
      );

      return;

    }

    if (
      !options.includes(answer)
    ) {

      alert(
        "Correct answer must exactly match one option"
      );

      return;

    }

    try {

      const questionsRef = ref(
        database,
        "questions"
      );

      await push(
        questionsRef,
        {

          question,

          options,

          answer,

          category,

          createdAt:
            new Date().toISOString(),

        }
      );

      alert(
        "✅ Question Added Successfully"
      );

      resetForm();

    } catch (err) {

      alert(
        "Failed to add question"
      );

      console.log(err);

    }

  };

  return (
    <>
      <Navbar />

      <main className="admin-page">

        <style>{`

          .admin-page {

            width:
              min(100% - 30px, 900px);

            margin:
              90px auto 60px;

            color: white;

            font-family:
              Inter,
              sans-serif;
          }

          .admin-card {

            padding: 36px;

            border-radius: 30px;

            background:
              rgba(15,23,42,0.75);

            border:
              1px solid rgba(255,255,255,0.08);

            backdrop-filter:
              blur(20px);

            box-shadow:
              0 30px 80px rgba(0,0,0,0.6);
          }

          .admin-title {

            margin: 0;

            font-size: 44px;

            font-weight: 900;
          }

          .admin-sub {

            margin-top: 10px;

            color: #94a3b8;

            line-height: 1.8;
          }

          .section-title {

            margin-top: 28px;
            margin-bottom: 10px;

            font-size: 14px;

            font-weight: 800;

            letter-spacing: 0.08em;

            text-transform: uppercase;

            color: #c4b5fd;
          }

          .admin-input,
          .admin-select {

            width: 100%;

            padding: 16px;

            margin-bottom: 14px;

            border-radius: 16px;

            border:
              1px solid rgba(255,255,255,0.08);

            background:
              rgba(15,23,42,0.7);

            color: white;

            font-size: 15px;

            box-sizing: border-box;
          }

          .admin-input:focus,
          .admin-select:focus {

            outline: none;

            border-color:
              rgba(167,139,250,0.7);
          }

          .admin-textarea {

            min-height: 120px;

            resize: vertical;
          }

          .btn-row {

            display: flex;

            gap: 14px;

            margin-top: 25px;

            flex-wrap: wrap;
          }

          .submit-btn,
          .reset-btn {

            flex: 1;

            padding: 16px;

            border: none;

            border-radius: 18px;

            font-size: 15px;

            font-weight: 800;

            cursor: pointer;

            transition: 0.25s ease;
          }

          .submit-btn {

            background:
              linear-gradient(
                135deg,
                #4f46e5,
                #7c3aed
              );

            color: white;
          }

          .submit-btn:hover {

            transform:
              translateY(-3px);

            box-shadow:
              0 20px 50px rgba(124,58,237,0.4);
          }

          .reset-btn {

            background:
              rgba(255,255,255,0.08);

            color: white;
          }

          .reset-btn:hover {

            background:
              rgba(255,255,255,0.14);
          }

          .preview-card {

            margin-top: 40px;

            padding: 28px;

            border-radius: 24px;

            background:
              rgba(255,255,255,0.03);

            border:
              1px solid rgba(255,255,255,0.06);
          }

          .preview-title {

            margin-top: 0;

            font-size: 24px;

            font-weight: 900;
          }

          .preview-category {

            margin-top: 10px;

            color: #a78bfa;

            font-size: 13px;

            font-weight: 800;

            letter-spacing: 0.08em;

            text-transform: uppercase;
          }

          .preview-question {

            margin-top: 22px;

            font-size: 22px;

            line-height: 1.7;

            font-weight: 700;
          }

          .preview-options {

            margin-top: 22px;

            display: flex;

            flex-direction: column;

            gap: 14px;
          }

          .preview-option {

            padding: 16px;

            border-radius: 16px;

            background:
              rgba(255,255,255,0.04);

            border:
              1px solid rgba(255,255,255,0.06);
          }

          .correct-answer {

            margin-top: 22px;

            color: #4ade80;

            font-weight: 800;
          }

          @media (max-width: 768px) {

            .admin-card {

              padding: 26px 20px;
            }

            .admin-title {

              font-size: 34px;
            }

            .preview-question {

              font-size: 18px;
            }

            .btn-row {

              flex-direction: column;
            }

          }

        `}</style>

        <div className="admin-card">

          <h1 className="admin-title">
            MIB Admin Panel
          </h1>

          <p className="admin-sub">
            Add and manage quiz
            questions for the
            competition.
          </p>

          {/* CATEGORY */}
          <p className="section-title">
            Category
          </p>

          <select
            className="admin-select"

            value={category}

            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >

            {categories.map((cat) => (

              <option
                key={cat}
                value={cat}
              >

                {cat}

              </option>

            ))}

          </select>

          {/* QUESTION */}
          <p className="section-title">
            Question
          </p>

          <textarea
            className="admin-input admin-textarea"

            placeholder="Enter question"

            value={question}

            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
          />

          {/* OPTIONS */}
          <p className="section-title">
            Options
          </p>

          {options.map(
            (opt, index) => (

              <input
                key={index}

                type="text"

                className="admin-input"

                placeholder={`Option ${
                  index + 1
                }`}

                value={opt}

                onChange={(e) =>
                  handleOptionChange(
                    e.target.value,
                    index
                  )
                }
              />

            )
          )}

          {/* ANSWER */}
          <p className="section-title">
            Correct Answer
          </p>

          <input
            type="text"

            className="admin-input"

            placeholder="Must exactly match one option"

            value={answer}

            onChange={(e) =>
              setAnswer(
                e.target.value
              )
            }
          />

          {/* BUTTONS */}
          <div className="btn-row">

            <button
              className="submit-btn"

              onClick={handleSubmit}
            >

              ➕ Add Question

            </button>

            <button
              className="reset-btn"

              onClick={resetForm}
            >

              Reset Form

            </button>

          </div>

          {/* PREVIEW */}
          <div className="preview-card">

            <h2 className="preview-title">
              Live Preview
            </h2>

            <div className="preview-category">

              {category}

            </div>

            <div className="preview-question">

              {question ||
                "Your question preview will appear here..."}

            </div>

            <div className="preview-options">

              {options.map(
                (opt, i) => (

                  <div
                    key={i}

                    className="preview-option"
                  >

                    <strong>
                      {String.fromCharCode(
                        65 + i
                      )}
                      .
                    </strong>{" "}

                    {opt ||
                      "Empty option"}

                  </div>

                )
              )}

            </div>

            {answer && (

              <div className="correct-answer">

                ✅ Correct Answer:
                {" "}
                {answer}

              </div>

            )}

          </div>

        </div>
      </main>
    </>
  );
}

export default Admin;