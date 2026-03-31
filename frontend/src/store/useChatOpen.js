import { create } from "zustand";

export const useChatOpen = create((set)=> ({
    openChat: false,
    setOpenChat: (openChat) =>{
        set({openChat})
    }
}))