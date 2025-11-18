import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Profile from "./Profile";

import api from "./api/axios.ts";

const ProfileWrapper = ({ currentUser }) => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    api.get(`/users/${id}`)
      .then((res) => setProfileUser(res.data))
      .catch(() => setProfileUser(null));
  }, [id]);

  if (!profileUser) return <div>Loading...</div>;

  return <Profile user={profileUser} currentUser={currentUser} />;
};

export default ProfileWrapper;
