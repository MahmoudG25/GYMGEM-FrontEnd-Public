import React from "react";

export default function Toast({ toasts, onRemove }) {
  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`max-w-sm w-full px-4 py-2 rounded shadow-lg text-white flex items-start justify-between gap-4 break-words ${
            t.type === "success" ? "bg-green-600" : t.type === "error" ? "bg-red-600" : "bg-gray-800"
          }`}
        >
          <div className="flex-1 text-sm">{t.message}</div>
          <button
            onClick={() => onRemove(t.id)}
            className="ml-4 font-bold text-white opacity-90 hover:opacity-100"
            aria-label="dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
