import React, { PropsWithChildren, useState } from "react";

export const Context = React.createContext(10);
export const CounterProvider = ({ children }: PropsWithChildren) => {
  return <Context.Provider value={40}>{children}</Context.Provider>;
};


export const Count = React.createContext<[number, (x: number) => void] | null>(null);
export const CountProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(Number(1));

  return <Count.Provider value={[count, setCount]}>{children}</Count.Provider>;
};



// WSYZSTKIER HOOKI WWRZUC TU
