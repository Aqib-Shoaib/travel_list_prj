import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Shirts", quantity: 4, packed: false },
//   { id: 4, description: "Caps", quantity: 20, packed: true },
//   { id: 5, description: "Bags", quantity: 2, packed: false },
//   { id: 6, description: "Carpets", quantity: 5, packed: false },
// ];
export default function App() {
  const [items, setItems] = useState([]);
  function onDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function onCheckStatus(id) {
    setItems((items) =>
      //here we are checking if the item.id is the id of clicked id and then changing the packed property of that item to its opposite, otherwise we return the same object
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function clearList() {
    const confirmed = window.confirm("Are you sure to clear the list?");
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={setItems} />
      <PackingList
        itemArray={items}
        handleDeleteItems={onDeleteItem}
        handleCheckBox={onCheckStatus}
        handleClearingList={clearList}
      />
      <Stats itemArray={items} />
    </div>
  );
}
function Logo() {
  return <h1> 🌴 Far Away 👜</h1>;
}
function Form({ handleAddItems }) {
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);

  //adding new items to the items array declared in useState
  function addItem(obj) {
    handleAddItems((items) => [...items, obj]);
  }
  // handling the submit event
  function handleSubmit(e) {
    e.preventDefault();
    const ItemObj = {
      id: Date.now(),
      description: desc,
      quantity: quantity,
      packed: false,
    };
    addItem(ItemObj);

    // setting the original values back
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
function PackingList({
  itemArray,
  handleDeleteItems,
  handleCheckBox,
  handleClearingList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems = [];

  if (sortBy === "input") sortedItems = [...itemArray];
  if (sortBy === "packed")
    sortedItems = itemArray
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  if (sortBy === "Quantity")
    sortedItems = itemArray.slice().sort((a, b) => b.quantity - a.quantity);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            handleDeleteItems={handleDeleteItems}
            handleCheckBox={handleCheckBox}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="packed">Sort by Packed Status</option>
          <option value="Quantity">Sort by Quantity</option>
        </select>
        <button onClick={handleClearingList}>CLEAR LIST</button>
      </div>
    </div>
  );
}
function Item({ item, handleDeleteItems, handleCheckBox }) {
  return (
    <li>
      <input
        type="checkBox"
        value={item.packed}
        onChange={() => handleCheckBox(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stats({ itemArray }) {
  //the first two variables; lengthItems, packedLength are called derived states
  const lengthItems = itemArray.length;
  const packedLength = itemArray.filter((item) => item.packed === true).length;
  //the initial condition here in the following line of code prevents any unexpected errors
  const packedPercentage =
    lengthItems === 0 ? 0 : Math.trunc((packedLength / lengthItems) * 100);

  return (
    <footer className="stats">
      {packedPercentage === 100 ? (
        <p>You Got Everything. Let's Goooo!!! 😍</p>
      ) : packedPercentage === 0 ? (
        <p>Start Packing Items as soon as possible 😊</p>
      ) : (
        <p>
          You have {lengthItems} items in your list and you have packed{" "}
          {packedLength} items ({packedPercentage}%).
        </p>
      )}
    </footer>
  );
}
