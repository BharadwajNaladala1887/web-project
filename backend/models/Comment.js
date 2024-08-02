import Comment from "../schema/Comment.js";
import User from "../schema/User.js";

// Creates a new comment
export const createComment = ({ userId, parentId, comment }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const commentObj = new Comment({ userId, parentId, comment, creationDateAndTime: Date.now() });
      const user = await User.findById(userId);
      const savedComment = await commentObj.save();
      resolve({ ...savedComment.toObject(), userId: user });
    } catch (error) {
      reject(error);
    }
  });
};

// Fetches comments by parent ID
export const getComments = ({ parentId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comments = await Comment.find({ parentId }).sort({ creationDateAndTime: -1 }).populate("userId");
      resolve(comments);
    } catch (error) {
      reject(error);
    }
  });
};

// Fetches the count of comments by parent ID
export const getCommentCount = ({ parentId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await Comment.countDocuments({ parentId });
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};
