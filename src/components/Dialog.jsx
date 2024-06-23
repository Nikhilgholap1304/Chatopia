import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useChatStore } from "../lib/chatStore";
import { useUserStore } from "../lib/userStore";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";

const DialogBox = ({ dialogOpen, setDialogOpen }) => {
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleDeleteChat = async () => {
    setLoading(true);
    if (!chatId || !user) {
      setLoading(false);
      return;
    }
    try {
      const chatDocRef = doc(db, "chats", chatId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (!chatDocSnap.exists()) {
        return toast.error("chat not found");
      }

      const chatData = chatDocSnap.data();

      await deleteDoc(chatDocRef);

      const currentUserChatsRef = doc(db, "userchats", currentUser.id);
      const currentUserChatsSnap = await getDoc(currentUserChatsRef);
      const currentUserChatsData = currentUserChatsSnap.data();

      const currentUserChatToRemove = currentUserChatsData.chats.find(
        (chat) => chat.chatId === chatId
      );

      // Step 4: Get the other user's chat data
      const userChatsRef = doc(db, "userchats", user.id);
      const userChatsSnap = await getDoc(userChatsRef);
      const userChatsData = userChatsSnap.data();

      const userChatToRemove = userChatsData.chats.find(
        (chat) => chat.chatId === chatId
      );

      // Step 5: Remove chat references from userchats collection for both users
      await updateDoc(currentUserChatsRef, {
        chats: arrayRemove(currentUserChatToRemove),
      });

      await updateDoc(userChatsRef, {
        chats: arrayRemove(userChatToRemove),
      });

      if (chatData.messages) {
        const deleteFilePromises = chatData.messages.map((message) => {
          if (message.contentUrl) {
            const fileRef = ref(storage, message.contentUrl);
            return deleteObject(fileRef);
          }
          return Promise.resolve();
        });
        await Promise.all(deleteFilePromises);
        useChatStore.setState({ chatId: null, user: null });
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem("chatId", null);
          localStorage.setItem("user", null);
          toast.success("chat deleted successfully");
          setDialogOpen(false);
          setSideBarOpen(false);
        }, 2000);
      }
    } catch (err) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSideBarOpen(false);
      }, 2000);
      console.log("error deleting chat", err);
      toast.error("Error deleting chat");
    }
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Chat"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By deleting this chat you will loose all the data related to it
              and can't be reverted back. Are you sure ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "#ff9886" }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteChat}
              variant="contained"
              color="error"
              disabled={loading}
              autoFocus
            >
              Delete
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#ff9886",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default DialogBox;
