import Like from "../schema/Like.js";

// Handles liking a post
export const like = ({ postId, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isLiked = await Like.findOne({ postId, userId });
      if (isLiked) return reject({ message: "Already liked" });
      const likeObj = new Like({ userId, postId });
      const likeDb = await likeObj.save();
      resolve(likeDb);
    } catch (error) {
      reject(error);
    }
  });
};

// Handles unliking a post
export const unLike = ({ postId, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const likeDoc = await Like.findOne({ postId, userId });
      if (!likeDoc) return reject({ message: "No like record found" });
      const unLikeDoc = await Like.findOneAndDelete({ postId, userId });
      resolve(unLikeDoc);
    } catch (error) {
      reject(error);
    }
  });
};

// Finds likes by post ID
export const findLikesByPostId = ({ postId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const likeDocs = await Like.find({ postId });
      resolve(likeDocs);
    } catch (error) {
      reject(error);
    }
  });
};
