import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AttachmentChip from "./AttachmentChip";

const ChatInput = ({ onSend, loading }) => {
  const [prompt, setPrompt] = useState("");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [projectFiles, setProjectFiles] = useState([]);
  const [showRepoInput, setShowRepoInput] = useState(false);
  const textareaRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    setProjectFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true, // We will trigger it via the chip
    noKeyboard: true,
  });

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 250)}px`;
    }
  }, [prompt]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim() && projectFiles.length === 0) return;
    
    onSend({ prompt, repositoryUrl, projectFiles });
    
    setPrompt("");
    setProjectFiles([]);
    setRepositoryUrl("");
    setShowRepoInput(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) {
        handleSubmit();
      }
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl p-4">
      {/* Attachments & Repo Link Popover / Inputs */}
      {showRepoInput && (
        <div className="mb-2 flex items-center gap-2">
          <input
            type="url"
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
            placeholder="https://github.com/user/repo"
            className="flex-1 rounded-xl border border-base-border bg-[#111827] px-4 py-2 text-sm text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
            autoFocus
          />
          <button 
            onClick={() => setShowRepoInput(false)}
            className="text-sm text-ink-muted hover:text-white"
          >
            Done
          </button>
        </div>
      )}

      <div 
        {...getRootProps()} 
        className={`relative flex flex-col rounded-2xl border border-base-border bg-base p-3 shadow-lg transition-all focus-within:border-brand-500`}
      >
        <input {...getInputProps()} />

        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your code or ask anything..."
          className="w-full resize-none bg-transparent px-2 py-2 text-white placeholder:text-gray-500 focus:outline-none"
          rows={1}
          disabled={loading}
          style={{ minHeight: "56px", maxHeight: "250px" }}
        />

        <div className="mt-2 flex items-center justify-between px-2 pb-1">
          <div className="flex flex-wrap items-center gap-2">
            <AttachmentChip
              icon="📎"
              label={projectFiles.length > 0 ? `${projectFiles.length} File(s)` : "Upload Project"}
              isActive={projectFiles.length > 0}
              onClick={open}
              onRemove={() => setProjectFiles([])}
            />
            
            <AttachmentChip
              icon="🔗"
              label={repositoryUrl ? "Repo Added" : "GitHub Repository"}
              isActive={!!repositoryUrl}
              onClick={() => setShowRepoInput(!showRepoInput)}
              onRemove={() => setRepositoryUrl("")}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || (!prompt.trim() && projectFiles.length === 0)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white transition-all hover:bg-brand-500 disabled:opacity-50"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-3 text-center text-xs text-ink-muted">
        DebugMind AI can make mistakes. Consider verifying critical code.
      </div>
    </div>
  );
};

export default ChatInput;
