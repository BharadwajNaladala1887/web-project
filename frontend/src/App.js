import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import SinglePostPage from "./pages/SinglePostPage";
import useAppTheme from "./hooks/useAppTheme";
import useUserFromToken from "./hooks/useUserFromToken";
import useAllPosts from "./hooks/useAllPosts";
import useFetchNewUser from "./hooks/useFetchNewUsers";
import Toast from "./components/utils/Toast";

function App() {
  useAppTheme();
  useUserFromToken();
  useAllPosts();
  useFetchNewUser();

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
        minHeight: '100vh',
        padding: '20px',
        transition: 'background-color 0.3s, color 0.3s',
      }}
      className="dark:bg-[--bg-dark] dark:text-[--text-light]"
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/post/:id" element={<SinglePostPage />} />
      </Routes>
      <Toast />
    </div>
  );
}

export default App;
