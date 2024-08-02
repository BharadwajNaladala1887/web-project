import {
  AspectRatio,
  Avatar,
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PLACEHOLDER_BANNER } from "../utils/constants";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { editProfile } from "../utils/profileFunctions";
import Toast from "./utils/Toast";

const EditProfile = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [newBanner, setNewBanner] = useState(null);
  const [newBannerFile, setNewBannerFile] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newProfileImageFile, setNewProfileImageFile] = useState(null);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newBio, setNewBio] = useState(user.bio);
  const [occupation, setOccupation] = useState(user.occupation);
  const [location, setLocation] = useState(user.location);
  const [isLoading, setIsLoading] = useState(false);

  const handleBannerImageInput = (e) => {
    setNewBanner(URL.createObjectURL(e.target.files[0]));
    setNewBannerFile(e.target.files[0]);
  };
  const handleProfileImageInput = (e) => {
    setNewProfileImage(URL.createObjectURL(e.target.files[0]));
    setNewProfileImageFile(e.target.files[0]);
  };
  const handleSaveButtonClick = () => {
    editProfile({
      token,
      newName,
      newEmail,
      newUsername,
      newBio,
      occupation,
      location,
      newProfileImageFile,
      newBannerFile,
      setIsLoading,
    });
  };
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <button style={{ padding: '8px 24px', border: '1px solid', borderRadius: '9999px', height: 'fit-content', marginTop: '12px' }}>
            Edit profile
          </button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450, padding: '16px', borderRadius: '8px' }}>
          <Toast />
          <Dialog.Title>Edit profile</Dialog.Title>
          <Flex direction="column" gap="16px">
            <AspectRatio ratio={16 / 4} style={{ position: 'relative' }}>
              <label
                htmlFor="bannerPicture"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '50%' }}>
                  <AddPhotoAlternateOutlinedIcon />
                </div>
              </label>
              <input
                type="file"
                id="bannerPicture"
                style={{ display: 'none' }}
                onInput={handleBannerImageInput}
              />
              <img
                src={newBanner || user.bannerPath || PLACEHOLDER_BANNER}
                alt="A house in a forest"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: '8px',
                }}
              />
            </AspectRatio>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <label
                htmlFor="profilePicture"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <div style={{ padding: '12px', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '50%' }}>
                  <AddPhotoAlternateOutlinedIcon />
                </div>
              </label>
              <input
                type="file"
                id="profilePicture"
                style={{ display: 'none' }}
                onInput={handleProfileImageInput}
              />
              <div style={{ width: '128px', height: '128px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#374151' }}>
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={newProfileImage || user.picturePath}
                />
              </div>
            </div>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                value={newName}
                placeholder="Enter your name"
                onChange={(e) => setNewName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Username
              </Text>
              <TextField.Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </label>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ width: '50%' }}>
                <Text as="div" size="2" mb="1" weight="bold">
                  Location
                </Text>
                <TextField.Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
              </label>
              <label style={{ width: '50%' }}>
                <Text as="div" size="2" mb="1" weight="bold">
                  Occupation
                </Text>
                <TextField.Input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Occupation"
                />
              </label>
            </div>
            <TextArea
              value={newBio}
              maxLength={280}
              onChange={(e) => setNewBio(e.target.value)}
              placeholder="Add bio"
            />
          </Flex>

          <Flex gap="16px" mt="16px" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button variant="soft" onClick={handleSaveButtonClick} disabled={isLoading}>
              Save
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default EditProfile;
