import { useEffect, useRef, useState } from "react";
import useStateRef from "./useStateRef";

export default function useFetchImages() {
  const [isLoading, setIsLoading, isLoadingRef] = useStateRef(false);
  const [images, setImages, imagesRef] = useStateRef([]);

  const maxImagesRef = useRef(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    getImages();
    return () => {};
  }, []);

  useEffect(() => {
    window.onscroll = function (ev) {
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight
      ) {
        onScrollBottom();
      }
    };
    return () => {};
  }, []);

  function onScrollBottom() {
    clearInterval(intervalRef.current);
    intervalRef.current = setTimeout(getImages, 100);
  }

  const getImages = async () => {
    if (isLoadingRef() || imagesRef().length >= maxImagesRef.current) return;

    setIsLoading(true);

    await fetch(`images?limit=10&offset=${imagesRef().length}`)
      .then((res) => res.json())
      .then((data) => {
        setImages([...imagesRef(), ...data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setIsLoading(false);
  };

  return { images, isLoading };
}
