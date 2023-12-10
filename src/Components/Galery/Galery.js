import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useFetchImages from "../../Hooks/useFetchImages";
import "./style.css";

export default function Galery() {
  const { images, isLoading } = useFetchImages();
  const [popupIndex, setPopupIndex] = useState(null);

  function showPopup(index) {
    setPopupIndex(index);
    document.body.style["overflow-y"] = "hidden";
  }

  function hidePopup() {
    setPopupIndex(null);
    document.body.style["overflow-y"] = "auto";
  }
  return (
    <>
      <div className={`galery`}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
          <Masonry columnsCount={3}>
            {images &&
              images.map((img, i) => (
                <div className="carItemCont" key={img.id}>
                  <img
                    className="carImg"
                    src={`${img.url}.jpg`}
                    onClick={() => showPopup(i)}
                    alt=""
                  />
                  <div className="userInfo">
                    <img
                      className="userImg"
                      src={`${img.user.profile_image}.webp`}
                      alt=""
                    />
                    <b>{img.user.name}</b>
                    <p>{img.user.bio}</p>
                  </div>
                </div>
              ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      {popupIndex ? (
        <div className="popupImage">
          <img
            className="popupClose"
            onClick={hidePopup}
            src="/cross-100s-200px.svg"
          />
          <img
            className="carImg"
            src={`${images[popupIndex].url}.jpg`}
            alt=""
          />
        </div>
      ) : null}
      {isLoading ? (
        <div
          className={`loaderContainer ${images.length == 0 ? "center" : ""}`}
        >
          <img className="pageLoader" src="/Spinner-1.6s-211px.svg" />
        </div>
      ) : null}
    </>
  );
}
