import axios from "axios"; // Import axios for making HTTP requests
import toast from "react-hot-toast"; // Import toast for showing notifications
import { BASE_URL } from "./constants"; // Import the base URL from constants

// Function to create a comment
export const createComment = async ({ postId, comment, token, user, setCommentSendLoading, setComments, setIsReplying, setShowReplies, setComment }) => {
  setCommentSendLoading(true); // Set loading state to true while the comment is being sent
  try {
    // Make a POST request to create a comment
    const response = await axios.post(`${BASE_URL}/comment/create`, {
      parentId: postId, comment, userId: user._id,
    }, { headers: { Authorization: `Bearer ${token}` } });

    setComment(''); // Clear the comment input field
    // Add the new comment to the existing comments state
    setComments((comments) => [response.data, ...comments]);
    if (setIsReplying) setIsReplying(false); // Reset the replying state if applicable
    if (setShowReplies) setShowReplies(true); // Show the replies if applicable
    toast.success("Comment sent"); // Show success notification
  } catch (error) {
    toast.error("Failed to send comment"); // Show error notification if the request fails
  }
  setCommentSendLoading(false); // Set loading state to false after the comment is sent
};

// Function to get comments for a post
export const getCommets = async ({ postId, setComments }) => {
  try {
    // Make a GET request to fetch comments for the given post ID
    const response = await axios.get(`${BASE_URL}/comment/get/${postId}`);
    setComments(response.data); // Update the comments state with the fetched comments
  } catch (error) {
    console.log(error); // Log any errors that occur during the request
  }
};

// Function to fetch the count of comments for a post
export const fetchCommentCount = async ({ postId, setCommentCount }) => {
  try {
    // Make a GET request to fetch the comment count for the given post ID
    const response = await axios.get(`${BASE_URL}/comment/count/${postId}`);
    setCommentCount(response.data.commentCount); // Update the comment count state with the fetched count
  } catch (error) {
    console.log(error); // Log any errors that occur during the request
  }
};
