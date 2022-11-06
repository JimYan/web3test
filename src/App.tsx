import "./styles.css";

import useStore from "./store/bears";
import Book from "./Book";
import Web3 from "./Web3";

export default function App() {
  const { bears, increasePopulation, removeAllBears } = useStore();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{bears}</p>
      <p>
        <button onClick={increasePopulation}>add+</button>
      </p>
      <button onClick={removeAllBears}>reset+</button>
      <Book />
      <Web3 />
    </div>
  );
}
