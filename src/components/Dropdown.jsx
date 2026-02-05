import { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select option");

  const options = ["start", "game", "pokedex", "hints/tips"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "200px" }}>
      <button onClick={() => setIsOpen(!isOpen)}>{selected} 🔽</button>
      {isOpen && (
        <ul style={{ border: "1px solid #ccc", marginTop: "4px" }}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              style={{ cursor: "pointer", padding: "8px" }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
