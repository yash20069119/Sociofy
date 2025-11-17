import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { decodeImage } from "../utils/decodeImage.js"

interface Post {
  _id: string;
  user: { username: string, profilePic?: any };
  userId: string;
  timestamp: string;
  caption?: string;
  image?: string;
  likes?: string[];
  comments?: { user: string; text: string }[] | string[];
}

const PostCard = ({
  post,
  currentUser,
  handleFollow,
  handleUnfollow,
}: {
  post: Post;
  currentUser: any;
  handleFollow: (id: string) => void;
  handleUnfollow: (id: string) => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [liked, setLiked] = useState(
    Array.isArray(post.likes) && post.likes.includes(currentUser._id)
  );

  const isOwner = currentUser._id === post.userId;
  const isFollowing = currentUser.following?.includes(post.userId);

  const profileImg = decodeImage(post.user?.profilePic);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/posts/${post._id}/like`
      );

      setLikes(res.data.likesCount);
      setLiked(res.data.liked);
    } catch (err) {
      console.log("Like error:", err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/api/posts/${post._id}/comment`,
        { text: commentText }
      );

      setComments(res.data.comments);
      setCommentText("");
    } catch (err) {
      console.log("Comment error:", err);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/post/${post._id}`;
    await navigator.clipboard.writeText(url);
    alert("Post link copied to clipboard!");
  };

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white absolute overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.userId}`}>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-green-200">
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-green-500 border border-green-600"></div>
              )}
            </div>
          </Link>

          <div>
            <Link to={`/profile/${post.userId}`}>
              <p className="font-semibold text-gray-800 hover:text-green-600 cursor-pointer">
                {post.user.username}
              </p>
            </Link>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>

        {/* MENU */}
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
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-md border shadow-md z-10">
              {isOwner ? (
                <>
                  <button className="block px-4 py-2 text-sm hover:bg-green-50 w-full text-left">
                    Edit Post
                  </button>

                  <button className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left border-t">
                    Delete Post
                  </button>
                </>
              ) : (
                <>
                  {isFollowing ? (
                    <button
                      onClick={() => handleUnfollow(post.userId)}
                      className="block px-4 py-2 text-sm hover:bg-green-50 w-full text-left"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(post.userId)}
                      className="block px-4 py-2 text-sm hover:bg-green-50 w-full text-left"
                    >
                      Follow
                    </button>
                  )}

                  <button
                    onClick={handleShare}
                    className="block px-4 py-2 text-sm hover:bg-green-50 w-full text-left"
                  >
                    Share
                  </button>

                  <button className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left border-t">
                    Report
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      {post.image ? (
        <img src={post.image} alt="Post" className="w-full h-80 object-cover" />
      ) : (
        <div className="h-80 bg-green-50 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No image</span>
        </div>
      )}

      {/* ACTIONS + CAPTION + COMMENTS */}
      <div className="px-4 py-3">
        {/* LIKE + COMMENT */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition-all ${
              liked ? "text-red-500 scale-110" : "text-gray-600"
            } hover:scale-110`}
          >
            <svg
              className="w-6 h-6"
              fill={liked ? "red" : "none"}
              stroke={liked ? "red" : "currentColor"}
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm">
              {likes.length ? likes.length : likes}
            </span>
          </button>

          <button
            onClick={() => setShowCommentBox(true)}
            className="flex items-center gap-1 text-gray-600 hover:text-green-600"
          >
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
            <span className="text-sm">{comments.length}</span>
          </button>
        </div>

        {/* CAPTION */}
        {post.caption && (
          <div className="text-sm text-gray-700 mt-2">
            <span className="font-semibold mr-2">{post.user.username}</span>
            {post.caption}
          </div>
        )}

        {/* COMMENTS */}
        {showCommentBox && (
          <>
            <div className="mt-3 space-y-2">
              {comments.map((c: any) => (
                <div key={c._id} className="text-sm bg-gray-100 rounded-md p-2">
                  <span className="font-semibold">{c.user?.name || "User"}: </span>
                  {c.text || c}
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full border rounded-md px-2 py-1 text-sm"
              />
              <button
                onClick={handleComment}
                className="bg-green-600 text-white rounded-md px-3 py-1 text-sm"
              >
                Post
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
