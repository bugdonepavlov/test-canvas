import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Bracket from "./views/Bracket";

const App = () => {
  return (
    <ChakraProvider>
      <div className="App">
        <Bracket />
      </div>
    </ChakraProvider>
  );
};

export default App;
