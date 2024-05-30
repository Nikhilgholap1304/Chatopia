import { create } from 'zustand'

const useUserStore = create((set) => ({
  currentUser: null,
  fetchUserInfo: async (uid) => {
    
  }
}))
