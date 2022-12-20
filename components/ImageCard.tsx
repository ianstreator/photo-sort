import React, { useEffect } from "react";
import Image from "next/image";
import { useState, useContext } from "react";
import { StateContext } from "../Context";
import { UrlSizes } from "../Types";

function ImageCard({
  urls: { thumb, full },
  uid,
  isSaved,
}: {
  urls: UrlSizes;
  uid: string;
  isSaved: Boolean;
}) {
  const { savedImages, setSavedImages, urls } = useContext(StateContext);
  const [saved, setSaved] = useState<Boolean>();

  const addToSaved = () => {
    setSaved(true);

    setSavedImages((curr) => ({
      ...curr,
      [uid]: { thumb, full },
    }));
  };

  const removeFromSaved = () => {
    setSaved(false);

    setSavedImages((curr) => {
      const updatedSavedImages = { ...curr };
      delete updatedSavedImages[uid];
      return {
        ...updatedSavedImages,
      };
    });
  };
  useEffect(() => {
    setSaved(isSaved);
  }, [urls]);

  return (
    <div className={`card ${saved && "saved"}`}>
      <div
        className="hover-text"
        onClick={saved ? removeFromSaved : addToSaved}
      >
        <div className={`saved-container ${saved && "show"}`}>
          <div className="saved">saved</div>
        </div>
        <p className={saved ? "remove" : "save"}>{saved ? "remove" : "save"}</p>
      </div>
      <Image src={thumb} width={175} height={175} alt="unsplash"></Image>
    </div>
  );
}

export default ImageCard;
