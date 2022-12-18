import React, { useEffect } from "react";
import Image from "next/image";
import { useState, useContext } from "react";
import { StateContext } from "../Context";
import { UrlSizes } from "../Types";


function ImageCard({ url, value }: { url: string; value: string }) {
  const [hover, setHover] = useState(false);
  const [saved, setSaved] = useState(false);
  

  const { savedImages, setSavedImages } = useContext(StateContext);

  const addToSaved = () => {
    setSaved(!saved);

    // setSavedImages(curr => [...curr!, value]);
  };

  useEffect(() => {
    setSaved(false);
  }, [url]);
  return (
    <div
      className={`card ${saved && "saved"}`}
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      onClick={addToSaved}
    >
      {hover && (
        <div className="hover-container">
          <p className={saved ? "remove" : "save"}>
            {saved ? "REMOVE" : "SAVE"}
          </p>
        </div>
      )}

      <div
        className={`image-container  ${hover && "hover"} ${
          saved && "saved-tag"
        }`}
      >
        <div className={`saved-container ${saved && "show"}`}>
          <p className="saved">SAVED</p>
        </div>

        <Image src={url} width={175} height={175} alt="unsplash"></Image>
      </div>
    </div>
  );
}

export default ImageCard;
