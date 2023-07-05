import React from "react";
export const Context = React.createContext(10);

export const CounterProvider = ({ children }) => {

    return <Context.Provider value={30} >{children}</Context.Provider>
}

// WSYZSTKIER HOOKI WWRZUC TU