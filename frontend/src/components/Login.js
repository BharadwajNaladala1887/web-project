import React, { useState } from "react";
import { validateLoginData, validateSignUpData } from "../utils/validateFormData";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Toast from "./utils/Toast";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthLoading, setUser } from "../state/AuthSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { clearPosts, setLoading } from "../state/PostSlice";
import { Button, TextField } from "@radix-ui/themes";

const Login = () => {
  const dispatch = useDispatch();
  const [isButtonLoading, setButtonLoading] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageInput = (e) => { setImage(URL.createObjectURL(e.target.files[0])); setFile(e.target.files[0]); };

  const register = async () => {
    setButtonLoading(true);
    try {
      const data = new FormData();
      data.append("upload_preset", "loop-profile-images");
      data.append("cloud_name", "dujoneujx");
      let cld;
      if (file) {
        data.append("file", file);
        cld = await axios.post("https://api.cloudinary.com/v1_1/dujoneujx/upload", data);
      }
      const body = { name, email, username, password, picturePath: cld?.data.secure_url || "" };
      const response = await axios.post(BASE_URL + "/auth/register", body);
      toast.success("You're signed up!!");
      setIsLogin(true);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.error);
      toast.error("Some error occurred");
    }
    setButtonLoading(false);
  };

  const login = async () => {
    setButtonLoading(true);
    const data = { loginId: email, password };
    try {
      const response = await axios.post(BASE_URL + "/auth/login", data);
      toast.success("Logged in");
      dispatch(setUser(response.data));
      dispatch(clearPosts());
      dispatch(setAuthLoading(false));
      dispatch(setLoading(true));
      navigate("/");
    } catch (error) {
      toast.error("Some error occurred");
    }
    setButtonLoading(false);
  };

  const handleLoginAndSignUp = () => {
    if (isLogin) {
      const error = validateLoginData({ loginId: email, password });
      if (error) return setError(error);
      setError(null);
      login();
    } else {
      const error = validateSignUpData({ name, email, password, username, confirmPassword });
      if (error) return setError(error);
      setError(null);
      register();
    }
  };

  if (user) return <Navigate to={"/"} />;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '24px',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'start',
        textAlign: 'center',
      }}
      className="dark:bg-[--bg-dark] dark:text-[--text-light] md:w-[30rem] w-full mx-auto"
    >
      <Toast />
      {!isLogin && (
        <div
          style={{
            border: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            height: '8rem',
            width: '8rem',
            borderRadius: '50%',
            marginBottom: '20px',
            position: 'relative',
          }}
        >
          {image && <img src={image} style={{ height: '100%', width: '100%', objectFit: 'cover' }} alt="" />}
          <label htmlFor="picture" style={{ position: 'absolute', cursor: 'pointer' }}><AddPhotoAlternateOutlinedIcon /></label>
          <input type="file" id="picture" style={{ display: 'none' }} onInput={handleImageInput} />
        </div>
      )}
      {!isLogin && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <TextField.Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
      )}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <TextField.Input placeholder={isLogin ? "Email / Username" : "Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {!isLogin && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <TextField.Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </div>
      )}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <TextField.Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      </div>
      {!isLogin && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <TextField.Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
        </div>
      )}
      <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>
      <Button
        variant="soft"
        onClick={handleLoginAndSignUp}
        style={{
          fontWeight: 'bold',
          width: '100%',
          color: 'var(--text-dark)',
          border: '1px solid var(--border-dark)',
          padding: '12px 16px',
          borderRadius: '8px',
          marginTop: '12px',
        }}
        className="dark:text-[--text-light] dark:border-[--border-light]"
      >
        {isLogin ? "Log in" : "Sign up"}
      </Button>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Log in"}
        </span>
      </p>
    </div>
  );
};

export default Login;
