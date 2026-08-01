import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Streaks from "./pages/Streaks";
import Profile from "./pages/Profile";
import ResetPass from "./pages/ResetPass";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-pass" element={<ResetPass />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/streaks" element={<Streaks />} />
            
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;