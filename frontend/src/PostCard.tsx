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
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white absolute overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 border border-green-600"></div>
          <div>
            <p className="font-semibold text-gray-800 cursor-pointer hover:text-green-600">
              {post.user.username}
            </p>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="6" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="18" r="1.5" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-md">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                Follow
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                Share
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 border-t border-gray-100 hover:bg-red-50">
                Report
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Image Placeholder */}
      <div className="bg-green-50 flex items-center justify-center h-80">
        <span className="text-gray-400 text-sm">Post Content</span>
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-red-500">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button className="text-gray-600 hover:text-green-600">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>

            <button className="text-gray-600 hover:text-green-600">
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>

          <button className="text-gray-600 hover:text-green-600">
            <svg
              className="w-5 h-5"
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

        {/* Caption */}
        {post.caption && (
          <div className="text-sm text-gray-700 mb-1">
            <span className="font-semibold text-gray-900 mr-2">
              {post.user.username}
            </span>
            {post.caption}
          </div>
        )}

        <button className="text-xs text-gray-500 hover:text-gray-700">
          View all comments
        </button>
      </div>
    </div>
  );
};

export default PostCard;
