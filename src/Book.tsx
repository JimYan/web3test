import useBookStore from "./store/books";

export default function Books() {
  const { books, add } = useBookStore();
  const addBook = function () {
    add({
      name: "asdf"
    });
  };
  return (
    <div>
      book: {books[books.length - 1]?.time}/{books.length}
      <button onClick={addBook}>新增book</button>
    </div>
  );
}
