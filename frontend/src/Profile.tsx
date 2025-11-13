import { useState } from "react";
import Navbar from "./Navbar";
import CreatePostForm from "./CreatePostForm";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("posts");
    const [showCreatePost, setShowCreatePost] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar onCreatePostClick={() => setShowCreatePost(true)} />

            {/* Create Post Form (Modal) */}
            {showCreatePost && (
                <>
                    {/* Dim + Blur Background */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
                        onClick={() => setShowCreatePost(false)}
                    ></div>

                    {/* Centered Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="relative w-full max-w-lg mx-4 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-2xl p-6">
                                <button
                                    onClick={() => setShowCreatePost(false)}
                                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
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
                <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center py-10 px-6">
                    {/* Profile Image */}
                    <div className="w-36 h-36 rounded-full border-[5px] border-indigo-500 overflow-hidden">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                            Profile Img
                        </div>
                    </div>

                    {/* Username, Edit Button, Settings */}
                    <div className="flex flex-col items-center mt-6 space-y-3">
                        {/* Username Row */}
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold tracking-tight">user12</h2>
                            <button className="px-4 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition">
                                Edit Profile
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-lg">
                                ⚙️
                            </button>
                        </div>

                        {/* Stats Row */}
                        <div className="flex justify-center items-center space-x-10 text-gray-700 text-sm mt-2">
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
                            <p className="font-medium text-gray-800">User 12</p>
                            <p>Living life to the fullest! 🌼</p>
                        </div>
                    </div>
                </div>


                {/* Tabs */}
                <div className="w-full max-w-3xl border-t border-gray-300 mt-10">
                    <div className="flex justify-center gap-12 mt-4 text-sm font-medium text-gray-600">
                        <button
                            onClick={() => setActiveTab("posts")}
                            className={`pb-2 transition ${activeTab === "posts"
                                ? "text-black border-b-2 border-black"
                                : "hover:text-gray-800 border-transparent"
                                }`}
                        >
                            📷 POSTS
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`pb-2 transition ${activeTab === "saved"
                                ? "text-black border-b-2 border-black"
                                : "hover:text-gray-800 border-transparent"
                                }`}
                        >
                            📑 SAVED
                        </button>
                        <button
                            onClick={() => setActiveTab("tagged")}
                            className={`pb-2 transition ${activeTab === "tagged"
                                ? "text-black border-b-2 border-black"
                                : "hover:text-gray-800 border-transparent"
                                }`}
                        >
                            🏷 TAGGED
                        </button>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="w-full max-w-5xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {activeTab === "posts" && (
                        <>
                            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                <div
                                    key={index}
                                    className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm"
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
