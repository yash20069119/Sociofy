import { useState } from "react";
import axios from "axios";

const EditProfileForm = ({ currentUser, onUpdate }) => {
  const [bio, setBio] = useState(currentUser.bio || "");
  const [profilePicBase64, setProfilePicBase64] = useState(currentUser.profilePic?.data || "");
  const [loading, setLoading] = useState(false);

  // Convert file → Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1]; // Remove prefix
      setProfilePicBase64(base64);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/${currentUser._id}`,
        {
          bio,
          profilePic: profilePicBase64
        },
        { withCredentials: true }
      );

      onUpdate(res.data.user);
    } catch (err) {
      console.error("Profile update error:", err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-center mb-4">Edit Profile</h2>

      {/* BIO */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
      </div>

      {/* PROFILE PIC FILE UPLOAD */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>

        <input
          type="file"
          accept="image/*"
          className="w-full mt-1"
          onChange={handleFileChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfileForm;
