import { Avatar, Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { follow, unFollow } from "../utils/profileFunctions";
import toast from "react-hot-toast";

const ProfileCard = ({ user, isSmallWidth }) => {
  const token = useSelector((state) => state.auth.token);
  const authUser = useSelector((state) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);

  useEffect(() => { if (token) fetchFollowDetails(); }, [token]);

  const fetchFollowDetails = async () => {
    const followDetails = await axios.get(BASE_URL + "/user/followdetails/" + user._id, { headers: { Authorization: `Bearer ${token}` } });
    if (followDetails.data.isFollowing) setIsFollowing(true);
    if (followDetails.data.isFollower) setIsFollower(true);
  };

  const handleFollow = (e) => { e.preventDefault(); if (!authUser) return toast.error("Please login first"); follow({ followingUserId: user._id, token }); setIsFollower(true); };

  const handleUnFollow = (e) => { e.preventDefault(); if (!authUser) return toast.error("Please login first"); unFollow({ followingUserId: user._id, token }); setIsFollower(false); };

  return (
    <Link to={`/profile/${user._id}`}>
      <Card>
        <Flex gap="3" align="center">
          <Avatar size="3" src={user.picturePath} radius="full" fallback={user.name[0]} />
          <Box>
            <Text as="div" size="2" weight="bold">
              {isSmallWidth && user.name.length > 15 ? user.name.slice(0, 15) + "..." : user.name}
            </Text>
            <Text as="div" size="2" color="gray">
              @{user.username} {isFollowing && <Badge color="blue" style={{ padding: "1px 4px" }}>Follows you</Badge>}
            </Text>
          </Box>
          {authUser?._id != user._id && (isFollower ? (
            <button style={{ padding: "0.25rem 0.75rem", border: "1px solid", color: "black", borderRadius: "9999px", marginLeft: "auto", fontSize: "0.875rem" }} className="dark:text-white" onClick={handleUnFollow}>Unfollow</button>
          ) : (
            <button style={{ padding: "0.25rem 0.75rem", backgroundColor: "var(--bg-dark)", color: "white", borderRadius: "9999px", marginLeft: "auto", fontSize: "0.875rem" }} className="dark:bg-[--bg-light] dark:text-black" onClick={handleFollow}>Follow</button>
          ))}
        </Flex>
      </Card>
    </Link>
  );
};

export default ProfileCard;
