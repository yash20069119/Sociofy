import { useState } from "react";
import Navbar from "./Navbar";
import CreatePostForm from "./CreatePostForm";

const Profile = ({user}) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [showCreatePost, setShowCreatePost] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onCreatePostClick={() => setShowCreatePost(false)} />
      {/* Create Post Modal */}
      {showCreatePost && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setShowCreatePost(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative w-full max-w-lg mx-4">
              <div className="bg-white rounded-xl shadow-md p-6 relative">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg"
                >
                  ✕
                </button>
                <CreatePostForm setShowCreatePost={setShowCreatePost} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Profile Container */}
      <div className="flex flex-col items-center w-full mt-10 px-4">
        {/* Profile Card */}
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl flex flex-col items-center py-10 px-6">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full border-4 border-green-500 overflow-hidden">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              Profile Img
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <button className="px-4 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition">
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center space-x-10 text-gray-700 text-sm mt-1">
              <p>
                <span className="font-semibold text-gray-900">36</span> posts
              </p>
              <p>
                <span className="font-semibold text-gray-900">320</span> followers
              </p>
              <p>
                <span className="font-semibold text-gray-900">268</span> following
              </p>
            </div>

            {/* Bio */}
            <div className="mt-3 text-center text-gray-600 text-sm leading-relaxed">
              <p className="font-medium text-gray-800">{user.name}</p>
              <p>Living life to the fullest! 🌿</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full max-w-3xl border-t border-gray-200 mt-10">
          <div className="flex justify-center gap-12 mt-4 text-sm font-medium text-gray-600">
            {["posts", "saved", "tagged"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition ${
                  activeTab === tab
                    ? "text-green-700 border-b-2 border-green-600"
                    : "hover:text-gray-800 border-transparent"
                }`}
              >
                {tab === "posts" && "📷 POSTS"}
                {tab === "saved" && "📑 SAVED"}
                {tab === "tagged" && "🏷 TAGGED"}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="w-full max-w-5xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activeTab === "posts" && (
            <>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm"
                >
                  Post Image {index + 1}
                </div>
              ))}
            </>
          )}

          {activeTab === "saved" && (
            <div className="col-span-3 text-center text-gray-500 py-12">
              No saved posts yet.
            </div>
          )}

          {activeTab === "tagged" && (
            <div className="col-span-3 text-center text-gray-500 py-12">
              No tagged photos yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
