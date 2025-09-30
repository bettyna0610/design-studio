import "./App.css";
import { useState } from "react";
import { StudioCanvas } from "./StudioCanvas";


export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="app">
      <div className="canvas-area">
        <StudioCanvas selectedId={selectedId} setSelectedId={setSelectedId} />
      </div>
      <div className="sidebar">
        <h2>Sidebar</h2>
        {selectedId !== null ? (
          <p>Selected cube ID: {selectedId}</p>
        ) : (
          <p>No cube selected</p>
        )}
      </div>
    </div>
  );
}
