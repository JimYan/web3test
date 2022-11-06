import create from "zustand";

interface IState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

const useStore = create<IState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}));

export default useStore;
