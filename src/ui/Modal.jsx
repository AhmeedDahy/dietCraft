import { useEffect } from "react";
import { createPortal } from "react-dom";

// eslint-disable-next-line react/prop-types
function Modal({ isOpen, onClose, children }) {
  // Close modal when clicking outside the content
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close modal when clicking outside
    >
      <div className="max-sm:px-3 w-[35rem]">
        <div
          className="relative w-full p-6 bg-white rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {children}
        </div>
      </div>
    </div>,
    document.body // Render the modal outside the root DOM element
  );
}

export default Modal;
