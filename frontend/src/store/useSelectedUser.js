import { create } from "zustand";

export const useSelectedUser = create((set)=> ({
    selectedUser: null,
    setSelectedUser: (selectedUser) =>{
        console.log("New User:", selectedUser);
        set({selectedUser})
    }
}))