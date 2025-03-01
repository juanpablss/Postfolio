import { useEffect, useState } from "react";

const ACCESS_KEY = "7aNEVluECH1NahjRGWtatI8b-DH1XHFEp-Uq6g2JrrU"; // Substitua pela sua chave

const useUnsplashImage = (query: string) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${query}&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        setImage(data.urls.regular);
      } catch (error) {
        console.error("Erro ao buscar imagem do Unsplash:", error);
      }
    };

    fetchImage();
  }, [query]);

  return image;
};

export default useUnsplashImage;
