import React from "react";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <div style={{ marginLeft: 40 }}>
        <Canvas canvasWidth={1400} canvasHeight={600} />
      </div>
    </div>
  );
}

export default App;
