import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

function App() {
  const location = useLocation();

  // 🌗 DARK MODE
const [dark, setDark] = useState(() => {
  // 🔥 get saved theme OR system preference
  const saved = localStorage.getItem("theme");

  if (saved) return saved === "dark";

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
});

useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [dark]);

  // ✨ CURSOR GLOW
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 🎬 LOADING SCREEN
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // 🔥 SHOW LOADER FIRST
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-3xl tracking-widest">
        ANKAA
      </div>
    );
  }

  return (
    <>
      {/* ✨ CURSOR GLOW */}
      <div
        className="fixed pointer-events-none z-50 w-40 h-40 rounded-full blur-3xl bg-white/10"
        style={{
          left: pos.x - 80,
          top: pos.y - 80,
        }}
      />

      {/* NAVBAR */}
      <Navbar dark={dark} setDark={setDark} />

      <div className="pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/admin"
              element={
                localStorage.getItem("isAdmin") === "true" ? (
                  <Admin />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
}

export default App;