import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Games from "./pages/games/Games";
import Home from "./pages/home/Home";
import TutorialOne from "./pages/Tutorial/Tutorial-1";
import GameOne from "./pages/games/game1/Game1";
import GameTwo from "./pages/games/game2/Game2";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/games" element={<Games />} />
          <Route path="/" element={<Home />} />
          <Route path="tutorial1" element={<TutorialOne />} />
          <Route path="game1" element={<GameOne />} />
          <Route path="game2" element={<GameTwo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
