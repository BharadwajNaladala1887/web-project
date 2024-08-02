import { AlertDialog, Flex, Button } from "@radix-ui/themes";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDeletePost } from "../utils/functions";

const DeletePostAlert = ({ postId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleDeleteButtonClick = () => { handleDeletePost({ postId, token, dispatch }); };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="w-full">
        <button style={{ color: "red", textDecoration: "underline" }}>Delete</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-md" style={{ maxWidth: 450, padding: "1.5rem" }}>
        <AlertDialog.Title className="text-lg font-semibold text-gray-800 dark:text-gray-200">Delete Post</AlertDialog.Title>
        <AlertDialog.Description className="text-gray-600 dark:text-gray-400" style={{ marginTop: "0.5rem" }}>Are you sure you want to delete this post?</AlertDialog.Description>
        <Flex style={{ gap: "0.75rem", marginTop: "1rem", justifyContent: "flex-end" }}>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" style={{ padding: "0.5rem 1rem", borderRadius: "0.375rem" }}>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleDeleteButtonClick} style={{ padding: "0.5rem 1rem", borderRadius: "0.375rem" }}>Delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeletePostAlert;
