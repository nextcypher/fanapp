import Footer from "components/Shared/Footer";
import Collection from "pages/Collection";
import Home from "pages/Home";
import Profile from "pages/Profile";
import Setting from "pages/Setting";
import Faq from "pages/Faq";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import milkWaySVG from "./assets/images/background/Milky Way.svg";
import topLeftVector from "./assets/images/background/tlvector.svg";
import topRightVector from "./assets/images/background/trvector.svg";
import Header from "./components/Shared/Header";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 3) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <div className={`relative flex flex-col h-full flex-1`}>
      <img
        src={topRightVector}
        alt=""
        className="absolute blur-[10rem] left-[-37rem] top-0 z-[-1]"
      />
      <img
        src={topLeftVector}
        alt=""
        className="absolute blur-[10rem] right-[-37rem] bottom-0  z-[-1]"
      />
      <img
        src={milkWaySVG}
        alt=""
        className="absolute w-[130vw] max-w-none blur-[1px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[-1] max-h-screen"
      />
      <Header scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <div className="flex flex-1" />
      <Footer />
    </div>
  );
}

export default App;
