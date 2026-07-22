import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBlock from "../analysis/CodeBlock"; // Reusing existing CodeBlock if we can, or we can just import it. Let's see if we need to modify it. Assuming we can import it.

const ResponseCard = ({ title, icon, content, type = "text", code = "" }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!content && !code && (!Array.isArray(content) || content.length === 0)) return null;

  const copyCode = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      // Can add a tiny toast or UI feedback here
    }
  };

  const renderContent = () => {
    if (type === "list") {
      if (!content || content.length === 0) return <p className="text-sm text-ink-muted">No suggestions.</p>;
      return (
        <ul className="space-y-2 text-sm text-ink-muted">
          {content.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-brand-500">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    
    if (type === "code") {
      return (
        <div className="relative mt-2 overflow-hidden rounded-xl">
          <div className="flex items-center justify-between bg-gray-900 px-4 py-2 text-xs text-gray-400">
            <span>Code Snippet</span>
            <button onClick={copyCode} className="hover:text-white transition">📋 Copy</button>
          </div>
          <CodeBlock code={code} />
        </div>
      );
    }

    return <p className="whitespace-pre-wrap text-sm text-ink-muted">{content}</p>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 overflow-hidden rounded-[18px] border border-base-border bg-base/50 backdrop-blur-xl shadow-lg"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-5 py-4 transition-colors hover:bg-base"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="font-semibold text-ink">{title}</h3>
        </div>
        <span className={`transform text-ink-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-base-border px-5 py-4">
              {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResponseCard;
