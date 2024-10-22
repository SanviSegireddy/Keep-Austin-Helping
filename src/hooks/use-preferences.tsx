import { UserPreferences } from "@/types";
import { create } from "zustand";

type PreferenceState = {
  userPreferences: UserPreferences;
  setUserPrefernces: (userPrefernces: UserPreferences) => void;
};

export const usePreferences = create<PreferenceState>((set) => ({
  userPreferences: {
    userCategories: [],
    userLocations: [],
  },
  setUserPrefernces: (userPreferences) => set({ userPreferences }),
}));
