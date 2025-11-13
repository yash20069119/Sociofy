
import { useNavigate } from "react-router-dom"; 

interface onCreatePostClick {
  onCreatePostClick: () => void;
}

const Navbar = ({ onCreatePostClick }: onCreatePostClick) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm backdrop-blur-sm bg-opacity-95">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div
          onClick={() => navigate("/home")} 
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm"> SF</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Sociofy
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search users, posts..."
              className="w-full px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-5">
          {/* Add Post (+) Button */}
          <button
            onClick={onCreatePostClick}
            className="p-2 text-white bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full shadow hover:scale-110 transition-transform"
            title="Create Post"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Like Button */}
          <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors hover:bg-indigo-50 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Message Button */}
          <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors hover:bg-indigo-50 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </button>

          {/* Profile Avatar */}
          <div
            onClick={() => navigate("/profile")} 
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500 hover:border-pink-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-pink-400"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
