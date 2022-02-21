import React from "react";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <Canvas
        width={window.innerWidth * devicePixelRatio}
        height={window.innerHeight * devicePixelRatio}
      />
    </div>
  );
}

export default App;
