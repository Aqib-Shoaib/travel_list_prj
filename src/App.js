import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shirts", quantity: 4, packed: false },
  { id: 4, description: "Caps", quantity: 20, packed: true },
  { id: 5, description: "Bags", quantity: 2, packed: false },
  { id: 6, description: "Carpets", quantity: 5, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1> 🌴 Far Away 👜</h1>;
}
function Form() {
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  // handling the submit event
  function handleSubmit(e) {
    e.preventDefault();
    const ItemObj = {
      id: Date.now(),
      description: desc,
      quantity: quantity,
      packed: false,
    };
    console.log(ItemObj);

    // setting the original values back
    setDesc(" ");
    setQuantity(1);
  }
  return (
    <div className="add-form" onSubmit={handleSubmit}>
      <h3>What do You Need for your trip? 🤔</h3>
      <form>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>{" "}
        <input
          type="text"
          placeholder="Item....."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></input>{" "}
        <button>ADD</button>
      </form>
    </div>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      You have X items in your list and you have packed X items
    </footer>
  );
}
