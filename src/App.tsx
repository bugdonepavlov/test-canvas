import React from "react";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <Canvas
        canvasWidth={window.innerWidth}
        canvasHeight={window.innerHeight}
      />
    </div>
  );
}

export default App;
