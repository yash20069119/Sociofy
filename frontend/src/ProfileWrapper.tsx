import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";

const ProfileWrapper = ({ currentUser }) => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/${id}`)
      .then((res) => setProfileUser(res.data))
      .catch(() => setProfileUser(null));
  }, [id]);

  if (!profileUser) return <div>Loading...</div>;

  return <Profile user={profileUser} currentUser={currentUser} />;
};

export default ProfileWrapper;
