import { useEffect, useState } from "react";

export default function ClearShortcut({ onClear }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClear?.();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000); // hide after 2s
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClear]);

  return (
    <>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-md animate-fadeInOut">
          All selections cleared
        </div>
      )}
    </>
  );
}
