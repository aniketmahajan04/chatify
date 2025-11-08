import { create } from "zustand";

interface ChatState {
    selectedChatId: string | null;
    setSelectedChat: (id: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    selectedChatId: null,
    setSelectedChat: (id) => set({ selectedChatId: id }),
}));
