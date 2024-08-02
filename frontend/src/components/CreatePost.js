import { TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { handlePost } from "../utils/functions";
import Toast from "./utils/Toast";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Tooltip } from "@radix-ui/themes";
import { XCircle } from "lucide-react";

const CreatePost = () => {
  const auth = useSelector((state) => state.auth);
  const [title, setTitle] = useState(""); 
  const [file, setFile] = useState(null); 
  const [image, setImage] = useState(null);
  const dispatch = useDispatch(); 
  const [isPosting, setIsPosting] = useState(false); 

  const handlePostButtonClick = () => { 
    handlePost({ title, file, token: auth.token, dispatch, user: auth.user, setIsPosting, setTitle, setImage, setFile }); 
  };
  const handleImageInput = (e) => { 
    setImage(URL.createObjectURL(e.target.files[0])); 
    setFile(e.target.files[0]); 
  };
  const handleRemoveImage = () => { 
    setFile(null); 
    setImage(null); 
  };

  return (
    <div>
      <Toast />
      <div style={{ display: "flex", alignItems: "start", gap: "0.75rem", padding: "0.75rem", borderRadius: "0.375rem", backgroundColor: "rgba(0, 122, 255, 0.1)" }} className="border border-[--border-dark] dark:border-[--border-light] rounded-md dark:bg-blue-900">
        <Avatar src={auth.user.picturePath} fallback={auth.user.name[0]} radius="full" size="2" />
        <div style={{ width: "100%" }}>
          <TextareaAutosize value={title} onChange={(e) => setTitle(e.target.value)} aria-label="empty textarea" className={"border-none outline-none bg-transparent resize-none w-full "} placeholder="Create a post..." />
          {image && (
            <div style={{ position: "relative" }}>
              <button style={{ position: "absolute", right: "-0.25rem", top: "-0.25rem", padding: "0.25rem", backgroundColor: "black", opacity: "0.45", borderRadius: "9999px" }} onClick={handleRemoveImage}>
                <XCircle />
              </button>
              <img src={image} alt="" style={{ borderRadius: "0.375rem" }} />
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "0.5rem" }}>
            <label>
              <Tooltip content="Upload image">
                <AddPhotoAlternateOutlinedIcon />
              </Tooltip>
              <input type="file" className="hidden" onInput={handleImageInput} />
            </label>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end", marginTop: "0.5rem" }}>
        <button disabled={(title === "" && !image) || isPosting} onClick={handlePostButtonClick} className="disabled:opacity-45 bg-[--bg-dark] dark:bg-[--bg-light] dark:text-black text-white h-8 px-4 rounded-full font-semibold">
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
