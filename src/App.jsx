import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Lazy load pages so users only download what they need
const Home = lazy(() => import("./pages/Home"));
const CreateQuiz = lazy(() => import("./pages/CreateQuiz"));
const HostRoom = lazy(() => import("./pages/HostRoom"));
const PlayerRoom = lazy(() => import("./pages/PlayerRoom"));

// A simple loading spinner for transitions
const PageLoader = () => (
  <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
    <div className="w-12 h-12 border-4 border-slate-700 border-t-teal-500 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/host/:quizId" element={<HostRoom />} />
          {/* PlayerRoom doesn't get the Navbar to save screen space on mobile */}
          <Route path="/play/:quizId" element={<PlayerRoom />} />
        </Routes>
      </Suspense>
    </Router>
  );
}