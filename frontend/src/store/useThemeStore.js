import { create } from "zustand";

export const useThemeStore = create((set)=> ({
    theme: localStorage.getItem("thundercoil-theme") || "lemonade",
    setTheme: (theme) =>{
        set({theme})
        localStorage.setItem("thundercoil-theme", theme)
    }
}))