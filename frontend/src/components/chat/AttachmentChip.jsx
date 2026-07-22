import React from "react";

const AttachmentChip = ({ icon, label, onClick, onRemove, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors border
        ${
          isActive
            ? "bg-brand-500/20 border-brand-500 text-brand-400"
            : "bg-[#111827] border-base-border text-ink-muted hover:border-gray-500 hover:text-white"
        }
      `}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {isActive && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default AttachmentChip;
