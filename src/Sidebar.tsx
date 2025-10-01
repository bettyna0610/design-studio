/*import type { Item } from "./types";
import { ColorPicker } from "./ColorPicker";

type SidebarProps = {
  items: Item[];
  addItem: () => void;
  deleteItem: (id: number) => void;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  updateItemColor: (id: number, color: string) => void;
};

export function Sidebar({
  items,
  addItem,
  deleteItem,
  selectedId,
  setSelectedId,
  updateItemColor,
}: SidebarProps) {
  const selectedItem = items.find((it) => it.id === selectedId);

  return (
    <div className="sidebar">
      <h2>Controls</h2>

      
      <button onClick={addItem}>Add Item</button>
      {selectedId !== null && (
        <button
          onClick={() => deleteItem(selectedId)}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete Selected
        </button>
      )}

    
      <h3>Items</h3>
      <ul style={{ maxHeight: "200px", overflowY: "auto", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              cursor: "pointer",
              fontWeight: selectedId === item.id ? "bold" : "normal",
              listStyle: "none",
              padding: "0.25rem 0",
            }}
            onClick={() => setSelectedId(item.id)}
          >
            Item {item.id}
          </li>
        ))}
      </ul>

    
      {selectedItem && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Edit Item</h3>
          <ColorPicker
            color={selectedItem.color}
            onChange={(newColor) => updateItemColor(selectedItem.id, newColor)}
          />
        </div>
      )}
    </div>
  );
}*/
import { HexColorPicker } from "react-colorful";
import type { Item } from "./types";

type SidebarProps = {
  items: Item[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  updateItemColor: (id: number, color: string) => void;
};

export function Sidebar({
  items,
  selectedId,
  setSelectedId,
  updateItemColor,
}: SidebarProps) {
  const selectedItem = items.find((it) => it.id === selectedId);

  return (
    <div className="sidebar">
      <h3>Items</h3>

      <select
        value={selectedId ?? ""}
        onChange={(e) =>
          setSelectedId(e.target.value ? Number(e.target.value) : null)
        }
      >
        <option value="">-- Select Item --</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            Item {item.id}
          </option>
        ))}
      </select>

      {selectedItem && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Edit Color</h4>
          <HexColorPicker
            color={selectedItem.color}
            onChange={(newColor) => {
              console.log("picker changed:", newColor, "for item", selectedItem.id);
              updateItemColor(selectedItem.id, newColor);
            }}
          />
          <p>
            Current: <b>{selectedItem.color}</b>
          </p>
        </div>
      )}
    </div>
  );
}
