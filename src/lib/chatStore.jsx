import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
  chatId: localStorage.getItem('chatId') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  currentUser: null,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    if(!chatId && !user){
      return set({
        chatId : null,
        user : null
      })
    }

    // check if the current user is blocked
    if (user.blocked.includes(currentUser.id)) {
      localStorage.setItem('chatId',chatId);
      localStorage.setItem('user',null)
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }
    // check if the receiver is blocked
    else if (currentUser.blocked.includes(user.id)) {
      localStorage.setItem('chatId',chatId);
      localStorage.removeItem('user')
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      localStorage.setItem('chatId',chatId);
      localStorage.setItem('user',JSON.stringify(user));
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },
  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));
