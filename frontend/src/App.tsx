import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";
import Profile from "./Profile";
import Signup from "./Signup";
import Login from "./Login";

axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState({
    _id: "null",
    name: "null",
    email: "null@gmail.com",
    __v: 0,
  }); 

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-green-600 text-xl">
        Loading...
      </div>
    );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        
        {/* 404 Page */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-10 text-2xl text-gray-700">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
