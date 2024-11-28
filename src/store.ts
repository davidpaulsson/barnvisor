import { create } from "zustand";
import { persist } from "zustand/middleware";

type LayoutStore = {
  layout: "grid" | "rows";
  setLayout: (layout: "grid" | "rows") => void;
};

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      layout: "grid",
      setLayout: (layout) => set({ layout }),
    }),
    {
      name: "layout",
    },
  ),
);
