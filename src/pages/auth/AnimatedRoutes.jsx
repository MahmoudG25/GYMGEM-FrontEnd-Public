// AnimatedRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;
