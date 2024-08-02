import Follow from "../schema/Follow.js";

// Handles following a user
export const followUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    if (!followingUserId) return reject({ message: "Following user id not found" });
    try {
      const isFollowing = await Follow.findOne({ followingUserId, followerUserId });
      if (isFollowing) return reject({ message: "Already following" });
      const followObj = new Follow({ followingUserId, followerUserId, creationDateAndTime: Date.now() });
      const followDoc = await followObj.save();
      resolve(followDoc);
    } catch (error) {
      reject(error);
    }
  });
};

// Handles unfollowing a user
export const unFollowUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followDoc = await Follow.findOneAndDelete({ followerUserId, followingUserId });
      resolve(followDoc);
    } catch (error) {
      reject(error);
    }
  });
};

// Fetches followers of a user
export const getFollowers = (followingUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followers = await Follow.find({ followingUserId }).populate("followerUserId");
      resolve(followers);
    } catch (error) {
      reject(error);
    }
  });
};

// Fetches followings of a user
export const getFollowings = (followerUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followings = await Follow.find({ followerUserId }).populate("followingUserId");
      resolve(followings);
    } catch (error) {
      reject(error);
    }
  });
};

// Fetches follower count of a user
export const getFollowerCount = (followingUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await Follow.find({ followingUserId }).countDocuments();
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};

// Fetches following count of a user
export const getFollowingCount = (followerUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await Follow.find({ followerUserId }).countDocuments();
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};

// Fetches follow document
export const getFollowDoc = ({ followingUserId, followerUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followDoc = await Follow.findOne({ followingUserId, followerUserId });
      resolve(followDoc);
    } catch (error) {
      reject(error);
    }
  });
};
