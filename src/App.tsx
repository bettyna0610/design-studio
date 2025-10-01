import { useState, useRef } from "react";
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
        color: "#ffffff", 
      });
    }
    return arr;
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const controlsRef = useRef<any>(null); 

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

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
    console.log("updateItemColor called for id:", id, "new color:", color);
  };

  return (
    <div className="app">
      <div className="canvas-area">
        <StudioCanvas
          items={items}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          updateItemPosition={updateItemPosition}
          onControlsReady={(controls) => (controlsRef.current = controls)}
        />
      </div>
      <Sidebar
        items={items}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        updateItemColor={updateItemColor}
        addItem={addItem}
        deleteItem={deleteItem}
        resetCamera={resetCamera} 
      />
    </div>
  );
}
