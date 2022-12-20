import React, { useState, createContext, useEffect } from "react";
import { UrlSizes, UidUrls } from "./Types";

type ContextProps = {
  children: React.ReactNode;
};

type ContextType = {
  savedImages: UidUrls;
  setSavedImages: React.Dispatch<React.SetStateAction<UidUrls>>;
  savedImagesArray: [string, UrlSizes][];
  urls: UidUrls;
  setUrls: React.Dispatch<React.SetStateAction<UidUrls>>;
};

export const StateContext = createContext({} as ContextType);

export const StateContextProvider = ({ children }: ContextProps) => {
  const [savedImages, setSavedImages] = useState<UidUrls>({});
  const savedImagesArray = Object.entries(savedImages) as [string, UrlSizes][];
  const [urls, setUrls] = useState<UidUrls>({});

  return (
    <StateContext.Provider
      value={
        {
          savedImages,
          setSavedImages,
          savedImagesArray,
          urls,
          setUrls,
        } as ContextType
      }
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
