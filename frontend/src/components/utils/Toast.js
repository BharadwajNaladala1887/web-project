import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

// Toast component to display toast notifications with customized styles
const Toast = () => {
  const theme = useSelector(state => state.app.theme); // Get the current theme from the Redux store

  return (
    <>
      <style>
        {`
          .toast-container {
            font-family: 'Arial, sans-serif';
            font-weight: bold;
          }
          .toast-light {
            border: 1px solid #3B82F6;
            padding: 10px 16px;
            color: black;
            background-color: powderblue;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            animation: slide-in 0.5s ease-out;
          }
          .toast-dark {
            border: 1px solid #3B82F6;
            padding: 10px 16px;
            color: white;
            background-color: #101010;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            animation: slide-in 0.5s ease-out;
          }
          @keyframes slide-in {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .icon-primary {
            color: #3B82F6;
          }
          .icon-secondary {
            color: white;
          }
        `}
      </style>
      <Toaster
        toastOptions={{
          className: "toast-container",
          style: theme === "dark" ? {
            border: "1px solid #3B82F6",
            padding: "10px 16px",
            color: "white",
            backgroundColor: "#101010",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            animation: "slide-in 0.5s ease-out"
          } : {
            border: "1px solid #3B82F6",
            padding: "10px 16px",
            color: "black",
            backgroundColor: "powderblue",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            animation: "slide-in 0.5s ease-out"
          },
          iconTheme: {
            primary: '#3B82F6', // Primary color for the icon
            secondary: 'white', // Secondary color for the icon
          },
        }}
      />
    </>
  );
};

export default Toast;
