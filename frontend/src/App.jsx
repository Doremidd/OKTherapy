import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Landing from './pages/Landing/Landing'
import TherapistList from './pages/TherapistList/TherapistList'
import UserProfile from './pages/UserProfile/UserProfile'
import Form from './pages/Form/Form'
import Footer from './components/Footer'
import EmailGenerator from './pages/EmailGenerator/EmailGenerator'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/matches" element={<TherapistList />} />
        <Route path="/email-generator" element={<EmailGenerator />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
