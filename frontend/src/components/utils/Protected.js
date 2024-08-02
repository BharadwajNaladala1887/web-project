import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Protected component to guard routes that require authentication
const Protected = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth); // Get user and loading state from Redux store
  
  console.log("protected", user); // Debug log to check user state

  if (loading) {
    // Display a loading message while authentication state is being determined
    return (
      <>
        <style>
          {`
            .loading-message {
              font-size: 2rem;
              text-align: center;
              margin-top: 2rem;
              color: #007BFF; /* Blue color */
              animation: fade-in 1.5s infinite ease-in-out;
            }
            @keyframes fade-in {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `}
        </style>
        <h1 className="loading-message">Loading...</h1>
      </>
    );
  }

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render child components if user is authenticated
  return children;
};

export default Protected;
