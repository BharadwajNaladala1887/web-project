import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, userLoading: true, feedLoading: true, userPosts: [], userLikedPosts: [], isOwnProfile: false, followDetails: null, page: 1, isLastPage: false };

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action) => { state.user = action.payload; state.userLoading = false; },
    setIsOwnProfile: (state, action) => { state.isOwnProfile = action.payload; },
    setUserLoading: (state, action) => { state.userLoading = action.payload; },
    setFollowDetails: (state, action) => { state.followDetails = action.payload; },
    setFollowCount: (state, action) => { const { followerCount, followingCount } = action.payload; state.followerCount = followerCount; state.followingCount = followingCount; },
    followUser: (state) => { state.followDetails.isFollower = true; state.followerCount += 1; },
    unFollowUser: (state) => { state.followDetails.isFollower = false; state.followerCount -= 1; },
    addUserPosts: (state, action) => { state.userPosts = state.userPosts.concat(action.payload); state.feedLoading = false; },
    clearUserPosts: (state) => { state.userPosts = []; },
    deletePostFromProfileFeed: (state, action) => { state.userPosts = state.userPosts.filter(post => post._id !== action.payload.postId); },
    increaseProfileFeedPage: (state) => { state.page += 1; },
    resetProfilePageNumber: (state) => { state.page = 1; },
    setIsLastPage: (state, action) => { state.isLastPage = action.payload; }
  }
});

export const { setUser, setIsOwnProfile, setUserLoading, setFollowDetails, setFollowCount, followUser, unFollowUser, addUserPosts, clearUserPosts, deletePostFromProfileFeed, increaseProfileFeedPage, resetProfilePageNumber, setIsLastPage } = ProfileSlice.actions;
export default ProfileSlice.reducer;
