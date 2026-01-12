import React from "react";

export default function PrintModal({ isOpen, onClose, onConfirm, onDownload, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Print Preview</h2>
        <div className="border p-4 mb-6 max-h-[70vh] overflow-auto">
          {children}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm Print
          </button>
          {onDownload && (
            <button
              onClick={onDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}