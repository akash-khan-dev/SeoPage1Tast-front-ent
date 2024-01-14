import React from "react";

const Profile = ({ pic, profileTitle }) => {
  return (
    <div className="profile">
      <div className="profile_img">
        <img src={pic} alt="profile" />
      </div>
      <p className="profile_name">{profileTitle}</p>
    </div>
  );
};

export default Profile;
