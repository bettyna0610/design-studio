import "./App.css";
import { StudioCanvas } from "./StudioCanvas";

function App() {
  return (
    <div className="app">
      <div className="canvas-area">
        <StudioCanvas />
      </div>
      <div className="sidebar"></div>
    </div>
  );
}

export default App;
