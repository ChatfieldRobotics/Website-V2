import React, { useEffect, useState } from "react";
import SHA256 from "crypto-js/sha256";

export default function Upload() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("website-test");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Map preset names to readable labels
  const uploadPresets = [
    { name: "Test", value: "website-test" },
    { name: "Image Carousel", value: "upload-carousel" },
    { name: "2024 Season", value: "upload-season_2024" },
    { name: "2025 Season", value: "upload-season_2025" },
  ];

  // Password hash for access (sha256 of your password)
  const VALID_HASH =
    "792c7128a2acde13f4522cf4eb17342db5849411ca817091c9c213d8eb27e014";

  // Check localStorage for persistent auth
  useEffect(() => {
    const storedAuth = localStorage.getItem("upload_auth");
    if (storedAuth === "true") setAuthorized(true);
  }, []);

  // Load Cloudinary script
  useEffect(() => {
    if (typeof window !== "undefined" && window.cloudinary) {
      setScriptLoaded(true);
      return;
    }

    const selector = 'script[src*="cloudinary.com"]';
    const existing = document.querySelector(selector);

    if (existing) {
      // If the script tag exists but cloudinary isn't available yet,
      // wait for its load event instead of assuming it's ready.
      if (typeof window !== "undefined" && window.cloudinary) {
        setScriptLoaded(true);
      } else {
        const onLoad = () => setScriptLoaded(true);
        existing.addEventListener("load", onLoad);
        // If the script has already loaded, ensure we set loaded flag
        if (
          existing.readyState === "complete" ||
          existing.readyState === "loaded"
        ) {
          setScriptLoaded(true);
        }
        return () => existing.removeEventListener("load", onLoad);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const input =
      e.currentTarget?.elements?.password?.value ?? e.target.password?.value ?? "";
    const hash = SHA256(input).toString();

    if (hash === VALID_HASH) {
      setAuthorized(true);
      localStorage.setItem("upload_auth", "true");
    } else {
      alert("Incorrect password!");
    }
  };

  const handleUploadClick = () => {
    if (!scriptLoaded || !(typeof window !== "undefined" && window.cloudinary)) {
      alert("Cloudinary script not loaded yet. Please wait a moment.");
      return;
    }

    try {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dfe5w9fih",
          uploadPreset: selectedPreset,
          sources: ["local", "url", "camera", "google_drive"],
          multiple: true,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary widget error:", error);
            return;
          }
          if (result && result.event === "success") {
            console.log("Upload Success:", result.info);
            setUploadedImage(result.info.secure_url);
          }
        }
      );

      widget.open();
    } catch (err) {
      console.error("Failed to open Cloudinary widget:", err);
      alert("Failed to open Cloudinary widget. Check console for details.");
    }
  };

  if (!authorized) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h1 className="text-2xl font-semibold">Enter Password to Continue</h1>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded-md px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2 hover:bg-blue-600"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className="text-2xl font-bold mb-6">Cloudinary Upload Widget</h1>

      <div style={{ marginTop: "20px" }}>
        <label htmlFor="presetSelect" className="mr-2 font-semibold">
          Choose Upload Preset:
        </label>
        <select
          id="presetSelect"
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
          className="border rounded-md px-2 py-1"
        >
          {uploadPresets.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 rounded-md text-white mt-6 px-5 py-2 hover:bg-blue-600"
        onClick={handleUploadClick}
        disabled={!scriptLoaded}
      >
        {scriptLoaded ? "Upload Image" : "Loading widget..."}
      </button>

      {uploadedImage && (
        <div style={{ marginTop: "40px" }}>
          <h2 className="text-lg font-semibold mb-2">Uploaded Image:</h2>
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{
              maxWidth: "400px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      )}
    </div>
  );
}
