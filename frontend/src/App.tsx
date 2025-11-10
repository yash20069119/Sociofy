import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Signup from "./Signup";
import Login from "./Login";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route -> Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main App Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />


        {/* Catch-All Route */}
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl text-gray-700">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
