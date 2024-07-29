import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing/Landing";
import UserProfile from "./pages/UserProfile/UserProfile";
import Footer from "./components/Footer";
import EmailGenerator from "./pages/EmailGenerator/EmailGenerator";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/reducer";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      dispatch(setUser(user));
    }
  }, [isLoading, isAuthenticated, user, dispatch]);
  
  return (
    <Router>
      <NavBar />
      <Routes>
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
