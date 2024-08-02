import React, { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { createComment, getCommets } from "../../utils/commentFunctions";
import { useSelector } from "react-redux";
import { TextField } from "@radix-ui/themes";
import { SendHorizontal } from "lucide-react";
import toast from "react-hot-toast";

// CommentList component to display a comment and its replies
const CommentList = ({ comment }) => {
  const { token, user } = useSelector((state) => state.auth); // Get user and token from Redux store
  const [replies, setReplies] = useState([]); // State to hold the list of replies
  const [showReplies, setShowReplies] = useState(false); // State to control the visibility of replies
  const [commentSendLoading, setCommentSendLoading] = useState(false); // State to indicate if a comment is being sent
  const [reply, setReply] = useState(""); // State to hold the reply input
  const [isReplying, setIsReplying] = useState(false); // State to control if the reply input is visible
  const replyInput = useRef(); // Reference to the reply input field

  // Fetch replies for the comment when the component mounts
  useEffect(() => {
    getCommets({ postId: comment._id, setComments: setReplies });
  }, [comment._id]);

  // Handle sending a reply
  const handleReply = () => {
    if (!user) return toast.error("Please login first"); // Show error if the user is not logged in
    createComment({
      postId: comment._id,
      comment: reply,
      token,
      user,
      setCommentSendLoading,
      setComments: setReplies,
      setIsReplying,
      setShowReplies,
      setComment: setReply,
    });
  };

  return (
    <>
      <style>
        {`
          .comment-item-container {
            border: 1px solid var(--border-dark);
            margin-bottom: 0.5rem;
            border-radius: 0.5rem;
          }
          .reply-container {
            padding: 0.75rem;
            position: relative;
          }
          .reply-button {
            font-size: 0.75rem;
            margin-left: 2.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .replies-container {
            padding-left: 0.75rem;
            border-left: 1px solid var(--border-dark);
          }
          .send-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 1.5rem;
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
      <div>
        <div className="comment-item-container dark:border-[--border-light]">
          {/* Render the main comment */}
          <Comment comment={comment} />
          {isReplying ? (
            <div className="reply-container">
              {/* Input field for replying */}
              <TextField.Input
                ref={replyInput}
                radius="full"
                placeholder="Add a reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              {/* Button to send the reply */}
              <button
                disabled={commentSendLoading || reply === ''}
                onClick={handleReply}
                className="send-button"
              >
                <SendHorizontal opacity={commentSendLoading ? 0.5 : 1} />
              </button>
            </div>
          ) : (
            <div>
              {/* Button to show/hide replies */}
              {replies.length > 0 && (
                <button
                  className="reply-button"
                  onClick={() => setShowReplies(!showReplies)}
                >
                  <p>
                    {!showReplies
                      ? replies.length === 1
                        ? `${replies.length} reply`
                        : `${replies.length} replies`
                      : "Hide replies"}
                  </p>
                </button>
              )}
              {/* Button to start replying */}
              <button
                className="reply-button"
                onClick={() => {
                  setIsReplying(true);
                  setTimeout(() => {
                    replyInput.current.focus();
                  }, 0);
                }}
              >
                Reply
              </button>
            </div>
          )}
        </div>
        {/* Render the list of replies */}
        {showReplies && (
          <div className="replies-container dark:border-[--border-light]">
            {replies.map((reply) => (
              <CommentList key={reply._id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentList;
