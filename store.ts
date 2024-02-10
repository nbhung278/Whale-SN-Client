import { create } from "zustand";
import { UserTypes } from "./types/user.types";

type UserStore = {
	user: UserTypes | null;
	setUser: (data: UserTypes) => void;
};

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (newData) => set({ user: newData }),
}));
