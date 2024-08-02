import React from "react";

// ProfileDataSkeleton component displays a skeleton screen for loading state of profile data
const ProfileDataSkeleton = () => {
  return (
    <>
      <style>
        {`
          .profile-skeleton-container {
            position: relative;
            border-radius: 0.5rem;
            overflow: hidden;
            min-height: 24rem;
            background-color: #f3f4f6; /* Light background color */
          }
          .header-skeleton {
            height: 11rem;
            animation: pulse 1.5s infinite ease-in-out;
            background-color: #e5e7eb; /* Lighter gray */
            border-radius: 0.5rem;
          }
          .profile-info {
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 8rem; /* Adjusted for proper positioning */
            width: 100%;
            padding: 0.75rem;
          }
          .profile-picture-container {
            display: flex;
            flex-direction: column;
          }
          .profile-picture-wrapper {
            height: 7rem;
            width: 7rem;
            border-radius: 50%;
            opacity: 1;
            position: relative;
            background-color: #9ca3af; /* Medium gray */
          }
          .profile-picture {
            height: 7rem;
            width: 7rem;
            animation: pulse 1.5s infinite ease-in-out;
            background-color: #e5e7eb; /* Lighter gray */
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
          }
          .profile-name {
            margin-top: 0.5rem;
            animation: pulse 1.5s infinite ease-in-out;
            background-color: #e5e7eb; /* Lighter gray */
            width: 10rem;
            height: 1.5rem;
            border-radius: 0.25rem;
          }
          .profile-bio {
            animation: pulse 1.5s infinite ease-in-out;
            background-color: #e5e7eb; /* Lighter gray */
            width: 50%;
            height: 1rem;
            border-radius: 0.25rem;
            margin-top: 0.5rem;
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.6;
            }
          }
        `}
      </style>
      <div className="profile-skeleton-container">
        {/* Header skeleton */}
        <div className="header-skeleton"></div>
        <div className="profile-info">
          <div className="profile-picture-container">
            <div className="profile-picture-wrapper">
              {/* Profile picture skeleton */}
              <div className="profile-picture"></div>
            </div>
            {/* Profile name skeleton */}
            <h1 className="profile-name"></h1>
            {/* Profile bio skeleton */}
            <p className="profile-bio"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDataSkeleton;
