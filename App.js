import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 12, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItems={handToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>lets GO!!!!😍🐱‍🏍</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>What do you need for your trip?</h2>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="...items"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            key={item.id}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select>
          <option value="input"> sort by input order</option>
          <option value="description"> sort by desciption order</option>
          <option value="packed"> sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <div>
      <li>
        <input
          type="checkbox"
          value={item.checked}
          onChange={() => onToggleItems(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItems(item.id)}> ❌</button>
      </li>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <b>start adding some items to your packing list</b>
      </p>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <b>
        {percentage === 100
          ? "you are packed everything"
          : ` 🤷‍♂️you have ${numItems} items already packed ${numPacked} (${percentage}%)`}
      </b>
    </footer>
  );
}
