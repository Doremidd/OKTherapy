import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing/Landing";
import UserProfile from "./pages/UserProfile/UserProfile";
import Footer from "./components/Footer";
import EmailGenerator from "./pages/EmailGenerator/EmailGenerator";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* <Route path="/index.html" element={<Navigate to="/home" replace />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/email-generator" element={<EmailGenerator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
