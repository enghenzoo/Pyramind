import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Games from "./pages/games/Games";
import Home from "./pages/home/Home";
import TutorialOne from "./pages/Tutorial/Tutorial-1";
import TutorialTwo from "./pages/Tutorial/Tutorial-2";
import GameOne from "./pages/games/game1/Game1";
import GameTwo from "./pages/games/game2/Game2";
import MobileWarning from "./Components/pc-needed";

// RouteChecker component: wraps protected routes with MobileWarning
function RouteChecker() {
  const location = useLocation(); // Get current route path
  const currentPath = location.pathname;

  // Define paths that require desktop (protected paths)
  const protectedPaths = ["/tutorial1", "/game1", "/game2"];

  // Check if current path is one of the protected paths
  const isProtectedPath = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  // If the path is protected, wrap it with MobileWarning
  if (isProtectedPath) {
    return (
      <MobileWarning>
        <Routes>
          {/* Public and protected routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/games" element={<Games />} />
          <Route path="/" element={<Home />} />
          <Route path="tutorial1" element={<TutorialOne />} />
          <Route path="tutorial2" element={<TutorialTwo />} />
          <Route path="game1" element={<GameOne />} />
          <Route path="game2" element={<GameTwo />} />
        </Routes>
      </MobileWarning>
    );
  }

  // If not a protected path, render routes normally
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/games" element={<Games />} />
      <Route path="/" element={<Home />} />
      <Route path="tutorial1" element={<TutorialOne />} />
      <Route path="tutorial2" element={<TutorialTwo />} />
      <Route path="game1" element={<GameOne />} />
      <Route path="game2" element={<GameTwo />} />
    </Routes>
  );
}

// Main App component
function App() {
  return (
    <>
      {/* Wrap the app with BrowserRouter for routing */}
      <BrowserRouter>
        <RouteChecker />
      </BrowserRouter>
    </>
  );
}

export default App;

