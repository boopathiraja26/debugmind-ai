import React from "react";
import { motion } from "framer-motion";

const ChatMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full flex-col items-end my-4"
    >
      <div className="max-w-[80%] rounded-2xl bg-base px-5 py-4 text-ink shadow-sm border border-base-border">
        <p className="whitespace-pre-wrap">{message}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
