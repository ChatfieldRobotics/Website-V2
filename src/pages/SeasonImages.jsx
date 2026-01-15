import React, { useEffect, useState } from "react";

export default function SeasonImages({ season }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const CLOUD_NAME = "dfe5w9fih";

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${season}.json`
        );

        if (!response.ok) {
          throw new Error(`No images found with tag: "${season}"`);
        }

        const data = await response.json();
        setImages(data.resources);
      } catch (err) {
        console.error("Cloudinary Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (season) fetchImages();
  }, [season]);

  const toggleSelect = (publicId) => {
    setSelectedIds((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  const handleDownload = async () => {
    if (selectedIds.length === 0) return;

    // Filter the actual image objects that are selected
    const toDownload = images.filter((img) => selectedIds.includes(img.public_id));

    toDownload.forEach((img) => {
      // Create the original image URL (without the 'list' constraint)
      const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${img.version}/${img.public_id}.${img.format}`;
      
      // Force download by creating a temporary link
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${img.public_id}.${img.format}`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F] mx-auto"></div>
        <p className="mt-4 text-[#264653] font-bold">Loading {season} Gallery...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b-2 border-[#E9C46A] pb-6">
          <div className="text-left">
            <h1 className="text-[#264653] text-4xl md:text-5xl font-bold uppercase tracking-tight">
              {season} Season
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Select images to save them to your device</p>
          </div>

          {/* Download Button - Matches NavBar Button Style */}
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <span className="text-[#264653] font-bold">{selectedIds.length} Selected</span>
            <button
              onClick={handleDownload}
              disabled={selectedIds.length === 0}
              className={`px-6 py-3 rounded-md font-bold transition transform shadow-md ${
                selectedIds.length > 0 
                ? "bg-[#8B1E3F] text-white hover:bg-[#F4A261] hover:scale-105 cursor-pointer" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Download Selected
            </button>
          </div>
        </div>

        {error ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-red-500 font-semibold text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => {
              const isSelected = selectedIds.includes(img.public_id);
              return (
                <div
                  key={img.public_id}
                  onClick={() => toggleSelect(img.public_id)}
                  className={`group relative bg-[#264653] rounded-lg overflow-hidden shadow-lg border-4 transition-all duration-300 cursor-pointer ${
                    isSelected ? "border-[#E9C46A]" : "border-transparent"
                  }`}
                >
                  <img
                    src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_fill,w_600,h_600,g_auto/v${img.version}/${img.public_id}.${img.format}`}
                    alt="Gallery item"
                    className={`w-full h-72 object-cover transition-opacity duration-300 ${
                      isSelected ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                    }`}
                  />
                  
                  {/* Selection Overlay */}
                  <div className={`absolute top-3 right-3 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center transition-colors ${
                    isSelected ? "bg-[#E9C46A]" : "bg-black/40"
                  }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#E9C46A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}