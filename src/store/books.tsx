import create from "zustand";

export interface IBook {
  name: string;
  time?: number;
}

interface IBookState {
  books: IBook[];
  add: (book: IBook) => void;
  // count: () => number;
}

const useBookStore = create<IBookState>((set, get) => ({
  books: [],
  add: (book: IBook) => {
    set((state) => {
      const books = get().books;
      console.log(books);
      return {
        books: books.concat({ time: new Date().getTime(), ...book })
      };
      // return { books: state.books.push(book) };
    });
  }
  // count: () => set.books.length
}));

export default useBookStore;
