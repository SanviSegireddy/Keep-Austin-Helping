import { create } from "zustand";

type SearchState = {
  search: string;
  setSearch: (search: string) => void;
};

export const useSearch = create<SearchState>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
