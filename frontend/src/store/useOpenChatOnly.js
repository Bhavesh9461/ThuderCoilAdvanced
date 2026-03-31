import { create } from "zustand";

export const useOpenChatOnly = create((set)=> ({
    openChatOnly: false,
    setOpenChatOnly: (openChatOnly) =>{
        set({openChatOnly})
    }
}))