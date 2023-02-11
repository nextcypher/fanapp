import "./App.scss";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "pages/Home";
import Setting from "pages/Setting";
import Profile from "pages/Profile";
import Collection from "pages/Collection";

function App() {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={`${isHover ? "hoverBackground" : "normalBackground"} h-fit`}
    >
      <Header isHover={setIsHover} />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
