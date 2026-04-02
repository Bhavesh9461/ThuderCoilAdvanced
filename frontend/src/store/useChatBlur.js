import { create } from "zustand";

export const useChatBlur = create((set)=> ({
    isBlurred: false,
    setIsBlurred: (isBlurred) =>{
        set({isBlurred})
    }
}))
