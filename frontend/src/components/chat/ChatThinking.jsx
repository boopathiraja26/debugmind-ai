import React from "react";
import { motion } from "framer-motion";

const ChatThinking = ({ steps }) => {
  return (
    <div className="my-4 flex w-full flex-col items-start">
      <div className="flex max-w-[80%] flex-col gap-3 rounded-2xl border border-base-border bg-base px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
          <span className="font-medium text-ink">DebugMind AI is thinking...</span>
        </div>
        
        {steps && steps.length > 0 && (
          <div className="mt-2 flex flex-col gap-2 border-t border-base-border pt-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-sm text-ink-muted"
              >
                <span className="text-green-500">✓</span>
                <span>{step}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatThinking;
