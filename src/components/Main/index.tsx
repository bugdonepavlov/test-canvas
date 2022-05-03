import React, { createContext, useReducer, Dispatch } from "react";
import { Stage as PixiStage } from "@inlet/react-pixi";
import {
  initialState,
  SettingsStateType,
  SettingsActions,
  reducer,
} from "./reducers";

export const MainAppContext = createContext<{
  state: SettingsStateType;
  dispatch: Dispatch<SettingsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const Main: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainAppContext.Provider value={{ state, dispatch }}>
      {children}
    </MainAppContext.Provider>
  );
};

export default Main;

// Бридж для передачи контекста в пики компоненты
export const ContextBridge: React.FC<any> = ({ children, Context, render }) => {
  return (
    <Context.Consumer>
      {(value: any) =>
        render(<Context.Provider value={value}>{children}</Context.Provider>)
      }
    </Context.Consumer>
  );
};

// Пикси рут
export const Stage: React.FC<any> = ({ children, ...props }) => {
  return (
    <ContextBridge
      Context={MainAppContext}
      render={(elements: any) => <PixiStage {...props}>{elements}</PixiStage>}
    >
      {children}
    </ContextBridge>
  );
};
