import React from "react";

// The PostSkeleton component displays a skeleton screen for loading state of a post.
const PostSkeleton = () => {
  return (
    <>
      <style>
        {`
          .post-skeleton-container {
            display: flex;
            width: 100%;
            border: 1px solid var(--border-light);
            gap: 0.5rem;
            padding: 0.5rem;
            padding-right: 2rem;
            border-radius: 0.5rem;
            animation: pulse 1.5s infinite ease-in-out;
          }
          .skeleton-avatar {
            height: 2rem;
            width: 2rem;
            border-radius: 50%;
            background-color: #e0e0e0; /* Lighter gray */
            animation: shimmer 1.5s infinite ease-in-out;
          }
          .skeleton-avatar.dark {
            background-color: #3b3b3b; /* Darker gray */
          }
          .skeleton-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .skeleton-title {
            height: 1.5rem;
            width: 8rem;
            background-color: #e0e0e0; /* Lighter gray */
            border-radius: 0.25rem;
            animation: shimmer 1.5s infinite ease-in-out;
          }
          .skeleton-title.dark {
            background-color: #3b3b3b; /* Darker gray */
          }
          .skeleton-body {
            height: 18rem;
            width: 100%;
            background-color: #e0e0e0; /* Lighter gray */
            border-radius: 0.25rem;
            animation: shimmer 1.5s infinite ease-in-out;
          }
          .skeleton-body.dark {
            background-color: #3b3b3b; /* Darker gray */
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.6;
            }
          }
          @keyframes shimmer {
            0% {
              background-position: -100% 0;
            }
            100% {
              background-position: 100% 0;
            }
          }
          .shimmer {
            background: linear-gradient(
              to right,
              #e0e0e0 0%,
              #f5f5f5 50%,
              #e0e0e0 100%
            );
            background-size: 200% 100%;
          }
          .dark .shimmer {
            background: linear-gradient(
              to right,
              #3b3b3b 0%,
              #4e4e4e 50%,
              #3b3b3b 100%
            );
            background-size: 200% 100%;
          }
        `}
      </style>
      <div className="post-skeleton-container dark:border-[--border-light]">
        {/* Skeleton avatar with shimmer effect */}
        <div className="skeleton-avatar shimmer dark"></div>
        <div className="skeleton-content">
          {/* Skeleton title with shimmer effect */}
          <div className="skeleton-title shimmer dark"></div>
          {/* Skeleton body with shimmer effect */}
          <div className="skeleton-body shimmer dark"></div>
        </div>
      </div>
    </>
  );
};

export default PostSkeleton;
