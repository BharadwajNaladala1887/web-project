import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import PostSkeleton from "../components/utils/PostSkeleton";
import Post from "../components/Post";

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(BASE_URL + `/post/getpost/${id}`);
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
      <Navbar />
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-light)", justifyContent: "center", gap: "1.5rem" }} className="dark:bg-[--bg-dark] flex">
        <div style={{ border: "1px solid var(--border-dark)", minHeight: "100vh", width: "100%", borderRadius: "0.375rem", padding: "0.5rem" }} className="dark:border-[--border-light] md:w-[40%] flex justify-center gap-2">
          {loading ? <PostSkeleton /> : <Post post={post} isPostPage={true} />}
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
