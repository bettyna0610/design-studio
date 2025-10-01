/* import { useState } from "react";
import { StudioCanvas } from "./StudioCanvas";
import { Sidebar } from "./Sidebar";
import "./App.css";
import type { Item } from "./types";



export default function App() {
 const [items, setItems] = useState<Item[]>(() => {
  const arr: Item[] = [];
  for (let i = 0; i < 200; i++) {
    const x = (Math.random() - 0.5) * 8;
    const y = 0.1;
    const z = (Math.random() - 0.5) * 8;
    arr.push({
      id: i,
      position: [x, y, z],
      color: "#ffffff"   // fontos: kezdeti szín
    });
  }
  return arr;
});


  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addItem = () => {
    const id = items.length > 0 ? items[items.length - 1].id + 1 : 0;
    const x = (Math.random() - 0.5) * 8;
    const y = 0.1;
    const z = (Math.random() - 0.5) * 8;
    setItems([...items, { id, position: [x, y, z], color: "#ff9900" }]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateItemPosition = (id: number, pos: [number, number, number]) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, position: pos } : item))
    );
  };

  const updateItemColor = (id: number, color: string) => {
  setItems((prev) =>
    prev.map((item) => (item.id === id ? { ...item, color } : item))
  );
};


  return (
    <div className="app">
      <div className="canvas-area">
        <StudioCanvas items={items} selectedId={selectedId} setSelectedId={setSelectedId} updateItemPosition={updateItemPosition}/>
      </div>
      <Sidebar
        items={items}
        addItem={addItem}
        deleteItem={deleteItem}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        updateItemColor={updateItemColor}
      />
    </div>
  );
}
 */
import { useState } from "react";
import { StudioCanvas } from "./StudioCanvas";
import { Sidebar } from "./Sidebar";
import type { Item } from "./types";
import "./App.css";

export default function App() {
  // 200 random item induláskor
  const [items, setItems] = useState<Item[]>(() => {
    const arr: Item[] = [];
    for (let i = 0; i < 200; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = 0.1;
      const z = (Math.random() - 0.5) * 8;
      arr.push({
        id: i,
        position: [x, y, z],
        color: "#ffffff", // fehér kezdőszín
      });
    }
    return arr;
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const updateItemColor = (id: number, color: string) => {
  setItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, color } : item
    )
  );
  console.log("updateItemColor called for id:", id, "new color:", color);
};

  return (
    <div className="app">
      <div className="canvas-area">
        <StudioCanvas
          items={items}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>
      <Sidebar
        items={items}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        updateItemColor={updateItemColor}
      />
    </div>
  );
}
