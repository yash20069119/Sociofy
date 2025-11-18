import { useState, useEffect } from "react";

import CreatePostForm from "./CreatePostForm";
import PostCard from "./PostCard";
import Navbar from "./Navbar";
import { decodeImage } from "../utils/decodeImage.ts";
import * as interfaces from "./interfaces"

import api from "./api/axios.ts";
import rootClient from "./api/rootClient.ts";

const Home = ({user}:interfaces.Homeele) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [currentUser, setCurrentUser] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await rootClient.get("/profile");
        setCurrentUser(res.data);
      } catch (err) {
        console.error("Error fetching current user:", err);
        setCurrentUser(user);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [showCreatePost]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await api.get("/users/");
        setSuggestions(res.data);
      } catch (err) {
          alert(err.response?.data?.message || "Failed to load posts");
        console.error("Error fetching suggestions:", err);
      }
    };
    fetchSuggestions();
  }, []);

  const handleFollow = async (targetId) => {
    try {
      await api.post(`/users/${targetId}/follow`, {});

      setCurrentUser((prev) => ({
        ...prev,
        following: [...prev.following, targetId],
      }));
    } catch (err) {
        alert(err.response?.data?.message || "Failed to follow user");
      console.error("Follow error:", err);
    }
  };

  const handleUnfollow = async (targetId) => {
    try {
      await api.post(`/users/${targetId}/unfollow`,{});

      setCurrentUser((prev) => ({
        ...prev,
        following: prev.following.filter((id) => id !== targetId),
      }));
    } catch (err) {
        alert(err.response?.data?.message || "Failed to unfollow user");
      console.error("Unfollow error:", err);
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <Navbar onCreatePostClick={() => setShowCreatePost(true)}  user={currentUser}/>
      <div className="absolute inset-0 bg-[url('/bg.png')] bg-no-repeat bg-fixed bg-cover backdrop-blur-lg filter blur-lg z-0"></div>
      
      <br/>
      <br/>
      <br/>
      <div className="max-w-8xl mx-auto flex flex-col lg:flex-row justify-center gap-10 px-6 py-10">
        {/* Main Content Area */}
        <div className="w-full lg:flex-1 lg:max-w-3xl space-y-8 z-10 order-2 lg:order-1">
          <div className="lg:hidden bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">
              Suggested for you
            </h3>
            <div className="space-y-4">
              {suggestions
                .filter((u) => u._id !== currentUser._id)
                .map((u) => {
                  const isFollowing = currentUser.following?.includes(u._id);
                  return (
                    <div key={u._id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-300 to-pink-300"></div>
                        <div>
                          <p className="font-semibold text-gray-700 text-sm">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                      {isFollowing ? (
                      <button
                        onClick={() => handleUnfollow(u._id)}
                        className="text-sm text-red-500 hover:text-red-600 font-semibold hover:scale-105 transition-transform"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(u._id)}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold hover:scale-105 transition-transform"
                      >
                        Follow
                      </button>
                    )}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Create Post Trigger */}
          <div
            onClick={() => setShowCreatePost(true)}
            className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 cursor-pointer hover:shadow transition"
          >
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400"></div>
              <span className="flex-1 text-left text-gray-500">What's on your mind?</span>
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Create Post Modal */}
          {showCreatePost && (
            <>
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
                onClick={() => setShowCreatePost(false)}
              ></div>
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative w-full max-w-lg mx-4 animate-fadeIn">
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="absolute top-3 right-4 hover:text-gray-800 text-xl"
                  >
                    ✕
                  </button>
                  <CreatePostForm setShowCreatePost={setShowCreatePost} />
                </div>
              </div>
            </>
          )}

          {loadingPosts ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
             <PostCard
                key={post._id}
                post={{
                  user: {
                    username: post.user?.name || "Unknown",
                    profilePic: post.user?.profilePic 
                  },
                  userId: post.user?._id,

                  timestamp: new Date(post.createdAt).toLocaleString(),
                  caption: post.caption,
                  image: post.image,
                  likes: post.likes,
                  comments: post.comments,
                  _id: post._id,
                }}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
              />

            ))
          ) : (
            <p className="text-center text-gray-500 mt-6">No posts yet.</p>
          )}
        </div>

        {/* Desktop Sidebar - Hidden on mobile, sticky on desktop */}
        <aside className="hidden lg:block w-80 space-y-6 order-1 lg:order-2">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 hover:scale-105 transition-transform cursor-pointer"></div>
              <div>
                <p className="font-bold text-gray-900">{currentUser.name}</p>
                <p className="text-sm text-gray-500">@{currentUser.name}</p>
              </div>
            </div>

            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">
              Suggested for you
            </h3>

            {suggestions
              .filter((u) => u._id !== currentUser._id) 
              .map((u) => {
                const isFollowing = currentUser.following?.includes(u._id);
                const profileImg = decodeImage(u.profilePic);  

                return (
                  <div key={u._id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">

                      {/* Avatar with profilePic support */}
                      <div className="w-11 h-11 rounded-full overflow-hidden cursor-pointer group-hover:scale-105 transition-transform">
                        {profileImg ? (
                          <img
                            src={profileImg}
                            alt={u.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-300 to-pink-300"></div>
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-700 text-sm">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                    </div>

                    {isFollowing ? (
                      <button
                        onClick={() => handleUnfollow(u._id)}
                        className="text-sm text-red-500 hover:text-red-600 font-semibold hover:scale-105 transition-transform"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(u._id)}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold hover:scale-105 transition-transform"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                );
              })}

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 leading-relaxed">
                © 2025 Sociofy 
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Create Button */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-8 right-8 lg:hidden w-16 h-16 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all z-50"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default Home;