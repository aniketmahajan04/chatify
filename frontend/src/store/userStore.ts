import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  status?: "online" | "offline";
}

interface UserStoreInterface {
  currentUser: User | null;

  setCurrentUser: (user: User | null) => void;
}

export const useUserStore = create<UserStoreInterface>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    {
      name: "user-store",
    }
  )
);
