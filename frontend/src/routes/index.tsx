import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../screens/Home'
import Login from '../screens/Login'

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
)

export default AppRouter
