import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "/src/components/NavBar";
import Footer from "/src/components/Footer";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Programs from "./pages/Programs";
import Donate from "./pages/Donate";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <NavBar />
      <br />
      <br />
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/donate" element={<Donate />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <br />
      <br />
      <Footer />
    </div>
  );
}
