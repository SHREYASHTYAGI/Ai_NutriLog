import { BrowserRouter,Route,Routes } from "react-router-dom";

import Login from "./pages/Login"
import  Register  from "./pages/Register";
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Streaks from "./pages/Streaks";
import Profile from "./pages/Profile";


function App(){
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/profile" element={<Profile />} />
  </Routes>
</BrowserRouter>
  )
}

export default App;