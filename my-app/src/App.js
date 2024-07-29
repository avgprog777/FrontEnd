import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import {SignUp} from './Components/SignUp/SignUp'
import {Login} from './Components/Login/Login'
import UserHome from './Components/UserHome/UserHome';
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/UserHome" element={<UserHome />} />
      </Routes>
    </Router>
  );
}

export default App;
