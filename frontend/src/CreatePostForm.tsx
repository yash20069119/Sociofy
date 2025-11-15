import axios from "axios";
import { useState } from "react";

interface setShowCreatePost {
  setShowCreatePost: (show: boolean) => void;
}

export default function CreatePostForm( {setShowCreatePost} : setShowCreatePost ) {


  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async () => {
  if (!image) {
    alert("Please select an image first.");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:3000/api/posts/",
      { image, caption },
      {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Post uploaded successfully:", response.data);
    alert("Post uploaded successfully!");

    setShowCreatePost(false);
  } catch (error) {
    console.error("Error uploading post:", error);
    alert("Failed to upload post.");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="flex items-center justify-center min-h-screen z-50 ">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold rounded-t-xl px-6 py-3">
          Create New Post
        </div>

        {/* Upload Section */}
        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-10 text-center">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="h-40 w-auto rounded-md mb-3"
              />
            ) : (
              <>
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
              </>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="imageUpload"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              {image ? "Change Image" : "Select from Computer"}
            </label>

            <p className="text-gray-400 text-xs mt-3">
              Supports: JPG, PNG, GIF (Max 15MB)
            </p>
          </div>

          {/* Caption Input */}
          <div className="mt-5">
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Caption
            </label>
            <textarea
              id="caption"
              rows={3}
              placeholder="Write a caption..."
              value={caption}
              onChange={(e)=> setCaption(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between px-6 pb-5">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300"
            onClick={() => setShowCreatePost(false)}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            } bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-md font-medium`}
          >
            {loading ? "Sharing..." : "Share Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
