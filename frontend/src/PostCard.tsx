import { useState } from "react";

interface Post {
  user: {
    username: string;
  };
  timestamp: string;
  caption?: string;
}

const PostCard = ({ post }: { post: Post }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-indigo-500 bg-gradient-to-br from-indigo-400 to-pink-400 hover:scale-105 transition-transform cursor-pointer"></div>
          <div>
            <p className="font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer">
              {post.user.username}
            </p>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>

        {/* Kebab Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="6" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="18" r="1.5" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden animate-fadeIn">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 text-sm font-medium transition-colors">
                Follow
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 text-sm font-medium transition-colors">
                Share
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-red-600 text-sm font-medium transition-colors border-t border-gray-100">
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Image Placeholder */}
      <div className="bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 flex items-center justify-center h-96 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="text-gray-400 text-sm font-medium z-10">Post Content</span>
      </div>

      {/* Post Actions */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-red-500 transition-all transform hover:scale-110">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button className="text-gray-600 hover:text-indigo-600 transition-all transform hover:scale-110">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>

            <button className="text-gray-600 hover:text-indigo-600 transition-all transform hover:scale-110">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>

          <button className="text-gray-600 hover:text-indigo-600 transition-all transform hover:scale-110">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {post.caption && (
          <div className="text-sm mb-2">
            <span className="font-semibold mr-2 text-gray-900">
              {post.user.username}
            </span>
            <span className="text-gray-700">{post.caption}</span>
          </div>
        )}

        <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">
          View all comments
        </button>
      </div>
    </div>
  );
};

export default PostCard;
