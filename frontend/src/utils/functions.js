import axios from "axios"; // Import axios for making HTTP requests
import { BASE_URL } from "./constants"; // Import the base URL from constants
import toast from "react-hot-toast"; // Import toast for notifications
import { createPost, deletePost } from "../state/PostSlice"; // Import actions from PostSlice
import { deletePostFromProfileFeed } from "../state/ProfileSlice"; // Import action from ProfileSlice

// Function to handle image upload
export async function handleImageUpload(e, setImagePath, setImageName) {
  if (!e.target.files[0]) return; // If no file is selected, return
  try {
    const formData = new FormData(); // Create a new FormData instance
    formData.append("picture", e.target.files[0]); // Append the selected file to FormData
    const response = await axios.post("http://localhost:8000/uploadfile", formData, { headers: { "Content-Type": "multipart/form-data" } }); // Make POST request to upload the file
    toast.success("Image uploaded"); // Show success notification
    setImageName(response.data.filename); // Set the image name state
    setImagePath(`${BASE_URL}/assets/${response.data.filename}`); // Set the image path state
  } catch (error) {
    console.log(error); // Log any error
    toast.error("There was some problem uploading the image"); // Show error notification
  }
}

// Function to handle post creation
export async function handlePost({ title, file, token, dispatch, user, setIsPosting, setTitle, setImage, setFile }) {
  setIsPosting(true); // Indicate that posting is in progress
  try {
    const data = new FormData(); // Create a new FormData instance
    data.append("upload_preset", "loop-socialmedia"); // Append preset for Cloudinary
    data.append("cloud_name", "dujoneujx"); // Append Cloudinary cloud name
    let cld;
    if (file) {
      data.append("file", file); // Append the file to FormData
      cld = await axios.post("https://api.cloudinary.com/v1_1/dujoneujx/upload", data); // Make POST request to Cloudinary
    }
    const response = await axios.post(`${BASE_URL}/post/create`, { title, image: cld?.data?.secure_url || "" }, { headers: { Authorization: `Bearer ${token}` } }); // Make POST request to create the post
    setFile(null); // Reset file state
    setImage(null); // Reset image state
    setTitle(""); // Reset title state
    toast.success("Post sent"); // Show success notification
    dispatch(createPost([{ ...response.data, userId: user }])); // Dispatch create post action
  } catch (error) {
    console.log(error); // Log any error
    toast.error("Failed to send post"); // Show error notification
  }
  setIsPosting(false); // Indicate that posting is done
}

// Function to handle post deletion
export async function handleDeletePost({ postId, token, dispatch }) {
  try {
    dispatch(deletePost({ postId })); // Dispatch delete post action
    dispatch(deletePostFromProfileFeed({ postId })); // Dispatch delete post from profile feed action
    await axios.post(`${BASE_URL}/post/delete`, { postId }, { headers: { Authorization: `Bearer ${token}` } }); // Make POST request to delete the post
    toast.success("Post deleted"); // Show success notification
  } catch (error) {
    toast.error("Post couldn't be deleted"); // Show error notification
    console.log(error); // Log any error
  }
}
