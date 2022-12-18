import React, { useState, createContext, useEffect } from "react";
import { UrlSizes } from "./Types";

type ContextProps = {
  children: React.ReactNode;
};

type ContextType = {
  savedImages: UrlSizes;
  setSavedImages: React.Dispatch<React.SetStateAction<UrlSizes>>;
};

export const StateContext = createContext({} as ContextType);

export const StateContextProvider = ({ children }: ContextProps) => {
  const [savedImages, setSavedImages] = useState<UrlSizes | null>(null);

  return (
    <StateContext.Provider
      value={
        {
          savedImages,
          setSavedImages,
        } as ContextType
      }
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
