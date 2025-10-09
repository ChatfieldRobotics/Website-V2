import { useState, useEffect } from "react";

export default function Carousel({ images }) {
  // If images are passed as a comma-separated string, split them
  const imageList = typeof images === "string" ? images.split(",") : images;

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = imageList.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % totalImages);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl h-[600px] mx-auto mt-8 overflow-hidden rounded-lg">
      <div
        className="flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageList.map((src, index) => (
          <div key={index} className="h-full min-w-full flex justify-center">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="h-full w-auto object-scale-down rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Prev/Next Buttons */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        &#10094;
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
      >
        &#10095;
      </button>
    </div>
  );
}
