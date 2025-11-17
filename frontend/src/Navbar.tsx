import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import * as interfaces from "./interfaces"
import { useEffect, useState } from "react";


const Navbar = ({ onCreatePostClick, user }: interfaces.NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(user);
  const LogOut = () => {
    axios
      .post("http://localhost:3000/logout", {}, { withCredentials: true })
      .then(() => {
        console.log("Logged out");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:3000/profile", { withCredentials: true })
        .then(res => setCurrentUser(res.data))
        .catch(err => console.error("Error refreshing user:", err));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="absolute fixed w-[100%] top-0 z-50 bg-green-950/70 backdrop-blur-xl border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <span className="font-semibold text-xl text-white">Sociofy</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 text-green-100">
          <input
            type="text"
            placeholder="Search users, posts..."
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Create Post */}
          {location.pathname !== "/profile" && (
            <button
              onClick={onCreatePostClick}
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}

          {/* Logout */}
          <button
            onClick={LogOut}
            className="text-white hover:text-green-700 text-sm font-medium transition"
          >
            Logout
          </button>
          <span
            className={`px-2 py-1 rounded-lg text-white ${
              currentUser.trustScore < 20
                ? "bg-red-500"
                : currentUser.trustScore < 40
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            Trust Score: {currentUser.trustScore}
          </span>
          {/* Profile Button */}
          <div
            onClick={() => navigate(`/profile/${currentUser._id}`)}

            className="w-9 h-9 rounded-full bg-green-400 flex items-center justify-center text-white font-bold cursor-pointer"
          >
            {currentUser?.name?.charAt(0) || "?"}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
