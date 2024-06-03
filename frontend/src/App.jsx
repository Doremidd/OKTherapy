import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Landing from './pages/Landing/Landing'
import TherapistList from './pages/TherapistList/TherapistList'
import UserProfile from './pages/UserProfile/UserProfile'
import Form from './pages/Form/Form'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/matches" element={<TherapistList />} />
      </Routes>
    </Router>
  )
}

export default App
