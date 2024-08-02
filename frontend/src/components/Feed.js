import React from "react";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import Post from "./Post";
import PostSkeleton from "./utils/PostSkeleton";
import useScrollPagination from "../hooks/useScrollPagination";

const Feed = () => {
  const user = useSelector((state) => state.auth.user);
  const { allPosts, loading, newPageLoading } = useSelector((state) => state.post);
  useScrollPagination();

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "1rem", display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "40rem", borderRadius: "0.375rem", paddingBottom: "2.5rem" }}>
        {user && <CreatePost />}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {loading ? Array(5).fill(0).map((_, i) => <PostSkeleton key={i} />) : allPosts.map((post) => (
            <div key={post._id} style={{ border: "1px solid", borderRadius: "0.375rem", padding: "1rem" }} className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
              <Post post={post} />
            </div>
          ))}
        </div>
        <div style={{ width: "100%", height: "5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {newPageLoading ? <p>Loading more posts...</p> : <h1></h1>}
        </div>
      </div>
    </div>
  );
};

export default Feed;
