import React from "react";
import { Avatar } from "@radix-ui/themes";

const Comment = ({ comment }) => {
  return (
    <>
      <style>
        {`
          .comment-container {
            display: flex;
            gap: 0.5rem;
            padding: 0.25rem; 
          }
          
          .comment-content {
            display: flex;/* Tailwind flex-col equivalent */
          }
          
          .comment-header {
            display: flex;
            gap: 0.5rem; 
          }
          
          .comment-author {
            font-size: 0.875rem; 
            font-weight: bold; 
          }
          
          .comment-text {
            font-size: 0.875rem; 
          }
        `}
      </style>
      <div className="comment-container">
        <Avatar
          src={comment.userId.picturePath}
          fallback={comment.userId.name[0]}
          radius="full"
          size="2"
        />
        <div className="comment-content">
          <div className="comment-header">
            <h1 className="comment-author">{comment.userId.name}</h1>
          </div>
          <p className="comment-text">{comment.comment}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
