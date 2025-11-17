import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  onCreatePostClick: () => void;
  currentUser: any;
}

const Navbar = ({ onCreatePostClick, currentUser }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const LogOut = () => {
  axios.post("http://localhost:3000/logout", {}, { withCredentials: true })
    .then(() => {
      console.log("Logged out");
      navigate("/login");
    })
    .catch((err) => {
      console.error("Logout error:", err);
    });
};
  return (
    <nav className="sticky top-0 z-50 bg-green-950/70  backdrop-blur-xl border-b shadow-sm">
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
        {/* Action Buttons */}
        {location.pathname!="/profile" && (<button
            onClick={onCreatePostClick}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            title="Create Post"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
            )}
          {/* Logout */}
          <button  onClick={LogOut} className="text-white hover:text-green-700 text-sm font-medium transition">
            Logout
          </button> 
          {/* Profile */}
          <div
            onClick={() => navigate(`/profile/${currentUser._id}`)}
            className="w-9 h-9 rounded-full bg-green-400 hover:bg-green-500 cursor-pointer border border-green-600"
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
