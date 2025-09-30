type SidebarProps = {
  items: { id: number; position: [number, number, number] }[];
  addItem: () => void;
  deleteItem: (id: number) => void;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
};

export function Sidebar({
  items,
  addItem,
  deleteItem,
  selectedId,
  setSelectedId,
}: SidebarProps) {
  return (
    <div className="sidebar">
      <h2>Controls</h2>
      <button onClick={addItem}>Add Item</button>
      {selectedId !== null && (
        <button onClick={() => deleteItem(selectedId)}>Delete Selected</button>
      )}

      <h3>Items</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              cursor: "pointer",
              fontWeight: selectedId === item.id ? "bold" : "normal",
            }}
            onClick={() => setSelectedId(item.id)}
          >
            Item {item.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
