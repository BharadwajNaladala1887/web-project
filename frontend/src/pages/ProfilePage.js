import React from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../components/ProfileDetails";
import ProfileFeed from "../components/ProfileFeed";
import Navbar from "../components/Navbar";
import useUserPosts from "../hooks/useUserPosts";
import useProfileFeedPagination from "../hooks/useProfileFeedPagination";

const ProfilePage = () => {
  const { id } = useParams();
  useProfileFeedPagination();
  useUserPosts(id);
  
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            border: "1px solid",
            borderColor: "gray",
            minHeight: "100vh",
            width: "100%",
            borderRadius: "0.375rem",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}
          className="dark:border-gray-900 md:w-[40%]"
        >
          <ProfileDetails id={id} />
          <ProfileFeed />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
