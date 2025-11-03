import { useState, useEffect } from "react";

export default function Carousel({ folder = "carousel" }) {
  const [imageList, setImageList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  // helper: ensure Cloudinary-served HEIC/HEIF are delivered in a browser-friendly format
  const ensureBrowserFormat = (url) => {
    try {
      if (!url || typeof url !== "string") return url;

      // Only transform Cloudinary URLs (won't accidentally touch other hosts)
      if (url.includes("res.cloudinary.com") || url.includes("cloudinary.com")) {
        // If there's already an f_ transform, leave it
        if (url.includes("/upload/f_")) return url;

        // Insert f_auto right after /upload/ so Cloudinary serves a compatible format
        return url.replace("/upload/", "/upload/f_auto/");
      }

      return url;
    } catch {
      return url;
    }
  };

  // Fetch images from Cloudinary via Cloudflare Worker
  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(
          `https://imagegrabber.chatfieldrobotics.workers.dev?folder=${folder}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch images: ${res.status}`);
        }

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Ensure we have valid image URLs
        if (Array.isArray(data) && data.length > 0) {
          // transform any Cloudinary HEIC/HEIF URLs to f_auto so browsers get a supported format
          setImageList(data.map((s) => ensureBrowserFormat(s)));
          setError(null);
        } else {
          throw new Error("No images found in the specified folder");
        }
      } catch (e) {
        console.error("Failed to fetch images:", e);
        setError(e.message);
      }
    }
    fetchImages();
  }, [folder]);

  // Auto-scroll every 5s
  useEffect(() => {
    if (!imageList.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % imageList.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [imageList]);

  const next = () => setCurrentIndex((i) => (i + 1) % imageList.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + imageList.length) % imageList.length);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!imageList.length) {
    return (
      <div className="flex items-center justify-center h-[600px] text-gray-500">
        Loading images...
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl h-[600px] mx-auto mt-8 overflow-hidden rounded-lg">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageList.map((src, index) => (
          <div key={index} className="h-full min-w-full flex justify-center bg-transparent">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="h-full w-auto object-contain rounded-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80"
      >
        &#10094;
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {imageList.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
