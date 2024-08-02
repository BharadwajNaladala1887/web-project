import { findLikesByPostId, like, unLike } from "../models/Like.js";

// Handles liking a post
export const handleLike = async (req, res) => {
  try {
    const postId = req.body.postId;
    const likeDb = await like({ userId: req.user._id, postId });
    return res.status(201).json({ likeDb });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Handles unliking a post
export const handleUnLike = async (req, res) => {
  try {
    const postId = req.body.postId;
    const likeDb = await unLike({ userId: req.user._id, postId });
    return res.status(201).json({ likeDb });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Handles fetching likes for a post
export const handleFetchLikes = async (req, res) => {
  try {
    const postId = req.body.postId;
    const likeDocs = await findLikesByPostId({ postId });
    return res.status(200).json({ likeDocs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
