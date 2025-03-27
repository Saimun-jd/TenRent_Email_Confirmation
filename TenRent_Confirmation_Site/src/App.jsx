import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import ConfirmEmail from './ConfirmationPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConfirmEmail />} />
      </Routes>
    </Router>
  )
}

export default App
