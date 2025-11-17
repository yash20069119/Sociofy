import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CreatePostForm from "./CreatePostForm";
import axios from "axios";
import PostCard from "./PostCard";
import EditProfileForm from "./editProfileForm";

import { decodeImage } from "../utils/decodeImage";

const Profile = ({ user, currentUser }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [userPosts, setUserPosts] = useState([]);
  const [currentUserState, setCurrentUserState] = useState(currentUser);

  const isFollowing = currentUserState.following?.includes(user._id);
  const [followers, setFollowers] = useState(user.followers.length);

  // Decode profile picture for this user's profile page
  const profileImgSrc = decodeImage(user.profilePic);

  // FETCH POSTS OF THIS USER
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/posts/user/${user._id}`,
          { withCredentials: true }
        );
        setUserPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [showCreatePost, user._id]);

  const numberOfPosts = userPosts.length;

  // 🔥 Fetch updated current user after follow/unfollow
  const refreshCurrentUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${currentUser._id}`,
        { withCredentials: true }
      );
      setCurrentUserState(res.data);
    } catch (err) {
      console.error("Error refreshing user:", err);
    }
  };

  // FOLLOW USER
  const handleFollow = async (targetId) => {
    try {
      setFollowers(followers + 1);
      await axios.post(
        `http://localhost:3000/api/users/${targetId}/follow`,
        {},
        { withCredentials: true }
      );

      await refreshCurrentUser();
    } catch (err) {
      console.error("Follow error:", err);
    }
  };

  // UNFOLLOW USER
  const handleUnfollow = async (targetId) => {
    try {
      setFollowers(followers - 1);
      await axios.post(
        `http://localhost:3000/api/users/${targetId}/unfollow`,
        {},
        { withCredentials: true }
      );

      await refreshCurrentUser();
    } catch (err) {
      console.error("Unfollow error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        onCreatePostClick={() => setShowCreatePost(false)}
        currentUser={currentUserState}
      />

      {/* CREATE POST MODAL */}
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

      {/* EDIT PROFILE MODAL */}
      {showEditProfile && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setShowEditProfile(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative w-full max-w-xl mx-4">
              <div className="bg-white rounded-xl shadow-md p-6 relative">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg"
                >
                  ✕
                </button>

                <EditProfileForm
                  currentUser={currentUserState}
                  onUpdate={(updatedUser) => {
                    setCurrentUserState(updatedUser);
                    setShowEditProfile(false);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* PROFILE PAGE */}
      <div className="flex flex-col items-center w-full mt-10 px-4">
        {/* PROFILE CARD */}
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl flex flex-col items-center py-10 px-6">

          {/* PROFILE PICTURE */}
          <div className="w-32 h-32 rounded-full border-4 border-green-500 overflow-hidden">
            {profileImgSrc ? (
              <img
                src={profileImgSrc}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Profile Img
              </div>
            )}
          </div>

          {/* USER INFO */}
          <div className="flex flex-col items-center mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">{user.name}</h2>

              {/* FOLLOW / UNFOLLOW / EDIT BUTTON */}
              {user._id === currentUserState._id ? (
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="px-4 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition"
                >
                  Edit Profile
                </button>
              ) : isFollowing ? (
                <button
                  onClick={() => handleUnfollow(user._id)}
                  className="px-4 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(user._id)}
                  className="px-4 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
                >
                  Follow
                </button>
              )}
            </div>

            {/* STATS */}
            <div className="flex justify-center items-center space-x-10 text-gray-700 text-sm mt-1">
              <p>
                <span className="font-semibold text-gray-900">{numberOfPosts}</span> posts
              </p>
              <p>
                <span className="font-semibold text-gray-900">{followers}</span> followers
              </p>
              <p>
                <span className="font-semibold text-gray-900">{user.following.length}</span> following
              </p>
            </div>

            {/* BIO */}
            <div className="mt-3 text-center text-gray-600 text-sm leading-relaxed">
              <p className="font-medium text-gray-800">{user.username}</p>
              <p>{user.bio || "No bio added yet."}</p>
            </div>
          </div>
        </div>

        {/* TABS */}
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

        {/* POSTS GRID */}
        <div className="w-full max-w-5xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activeTab === "posts" && (
            <>
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={{
                      user: { username: post.user?.name || "Unknown" },
                      userId: post.user?._id,
                      timestamp: new Date(post.createdAt).toLocaleString(),
                      caption: post.caption,
                      image: post.image,
                      likes: post.likes,
                      comments: post.comments,
                      _id: post._id,
                    }}
                    currentUser={currentUserState}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-6">No posts yet.</p>
              )}
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
