import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export function TestColor() {
  const [color, setColor] = useState("#ff0000");

  return (
    <div style={{ padding: "2rem" }}>
      <HexColorPicker
        color={color}
        onChange={(c) => {
          console.log("picker changed:", c);
          setColor(c);
        }}
      />
      <p>Current: {color}</p>
    </div>
  );
}
