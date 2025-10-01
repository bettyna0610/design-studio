
import { HexColorPicker } from "react-colorful";
import type { Item } from "./types";

type SidebarProps = {
  items: Item[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  updateItemColor: (id: number, color: string) => void;
  addItem: () => void;
  deleteItem: (id: number) => void;
};

export function Sidebar({
  items,
  selectedId,
  setSelectedId,
  updateItemColor,
  addItem,
  deleteItem
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