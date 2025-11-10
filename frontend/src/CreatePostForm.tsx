
interface setShowCreatePost {
  setShowCreatePost: (show: boolean) => void;
}

export default function CreatePostForm( {setShowCreatePost} : setShowCreatePost ) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 z-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold rounded-t-xl px-6 py-3">
          Create New Post
        </div>

        {/* Upload Section */}
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-10 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6"
              />
            </svg>
            <p className="text-gray-600 mb-1">Drag and drop your image here</p>
            <p className="text-gray-500 text-sm mb-4">or</p>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Select from Computer
            </button>

            <p className="text-gray-400 text-xs mt-3">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between px-6 pb-5">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300"
          onClick={() => setShowCreatePost(false)}>
            Cancel
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-md font-medium hover:opacity-90">
            Share Post
          </button>
        </div>
      </div>
    </div>
  );
}
