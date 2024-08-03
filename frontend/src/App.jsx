import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing/Landing";
import UserProfile from "./pages/UserProfile/UserProfile";
import Footer from "./components/Footer";
import EmailGenerator from "./pages/EmailGenerator/EmailGenerator";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { setAuth0User } from "./redux/reducer";
import { getUserAsync } from "./redux/thunk";

function App() {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [page, setPage] = useState("form");
  const auth0User = useSelector((state) => state.user.auth0User);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!auth0User) {
        dispatch(setAuth0User(user));
      }
      const sub = auth0User?.sub || user.sub;
      const result = await dispatch(getUserAsync(sub));
      if (result?.payload?.message !== "User not found") {
        setPage("matches");
      }
    };

    if (!isLoading && ((isAuthenticated && !!user) || !!auth0User)) {
      fetchUserProfile();
    }
  }, [dispatch, user, isLoading, isAuthenticated, auth0User]);
  return (
    <Router>
      <NavBar page={page} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={<Home page={page} isLoading={isLoading} />}
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/email-generator" element={<EmailGenerator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
