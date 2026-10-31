# memory.md

## Project Overview
* **Type**: Real-time Interactive Quiz Platform (Mentimeter-style).
* **Version**: v1 Minimum Viable Product.
* **Tech Stack**: React, Vite, Firebase Firestore, Tailwind CSS.

## UI & Styling Guidelines (Netlify-Inspired)
* **Theme**: Clean, modern, and developer-focused.
* **Colors**: 
  * Backgrounds: Deep solid darks (e.g., Slate-900 `#0f172a`) or crisp whites.
  * Accents: Vibrant Teal (`#14b8a6`), Cyan (`#06b6d4`), and Emerald for primary actions.
* **Components**: Card-based layouts, subtle borders (`border-slate-700`), soft shadows, and clean sans-serif typography.
* **Vibe**: Minimalist, high contrast, and highly responsive without unnecessary clutter.

## Core Features (v1)
* **Quiz Creation**: Hosts can input questions, options, correct answers, and time limits to generate a unique 6-digit Room PIN.
* **Participant Join**: Users join the lobby via the 6-digit PIN and a nickname (no account creation required).
* **Host Controls**: The host completely drives the pace (Start Quiz, Next Question, Show Leaderboard, End Quiz).
* **Real-Time Sync**: Participant screens update instantly via Firestore `onSnapshot` when the host changes the active question.
* **Live Interaction**: Participants receive a color-coded button layout to submit answers; the UI locks immediately upon submission to prevent duplicates.
* **Scoring System**: Instant point calculation based on correct answers and response speed.
* **Leaderboard**: Real-time ranking display triggered by the host between questions or at the end.