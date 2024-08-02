import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextField } from "@radix-ui/themes";
import { SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { createComment, getCommets } from "../../utils/commentFunctions";
import Comment from "./Comment";

// The CommentContainer component handles the creation and display of comments for a post.
const CommentContainer = ({ post }) => {
  const [comment, setComment] = useState(""); // State for the current comment input
  const { user, token } = useSelector((state) => state.auth); // Getting user and token from Redux store
  const [commentSendLoading, setCommentSendLoading] = useState(false); // State for loading status when sending a comment
  const [comments, setComments] = useState([]); // State for storing comments

  // Fetch comments when the component mounts or the post ID changes
  useEffect(() => {
    getCommets({ postId: post._id, setComments });
  }, [post._id]);

  // Handles sending a new comment
  const handleSendComment = () => {
    if (!user) return toast.error("Please login first"); // Ensure the user is logged in
    createComment({
      postId: post._id,
      comment,
      token,
      user,
      setCommentSendLoading,
      setComments,
      setComment,
    });
  };

  return (
    <>
      <style>
        {`
          .comment-container {
            border: 1px solid var(--border-light);
            border-radius: 0.5rem;
            padding: 0.5rem;
            margin-top: 0.5rem;
            margin-bottom: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            position: relative;
          }
          .send-button {
            position: absolute;
            right: 1rem;
            padding: 0.25rem;
            margin-top: 0.25rem;
            background-color: #007BFF;
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }
          .send-button:hover {
            background-color: #0056b3;
            transform: scale(1.1);
          }
          .send-button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        `}
      </style>
      <div className="comment-container">
        {/* Text field for inputting a new comment */}
        <TextField.Input
          radius="full"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {/* Button to send the comment */}
        <button
          disabled={commentSendLoading || comment === ""}
          className="send-button"
          onClick={handleSendComment}
        >
          <SendHorizontal opacity={commentSendLoading ? 0.5 : 1} />
        </button>
        {/* Display the list of comments */}
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default CommentContainer;
