import { useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "../ui/Button";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
];

const languageMap = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  "C++": "cpp",
  "C#": "csharp",
  Go: "go",
  Rust: "rust",
  PHP: "php",
};

const AnalysisForm = ({ onAnalyze, loading }) => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [bugDescription, setBugDescription] = useState("");
  const [code, setCode] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onAnalyze({
      title,
      language,
      bugDescription,
      code,
    });
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">

      {/* Title */}

      <div>
        <label className="mb-2 block font-medium text-ink">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Infinite Loop Bug"
          required
          className="w-full rounded-xl border border-base-border bg-[#111827] p-3 text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {/* Language */}

      <div>
        <label className="mb-2 block font-medium text-ink">
          Programming Language
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-xl border border-base-border bg-[#111827] p-3 text-white focus:border-brand-500 focus:outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option
              key={lang}
              value={lang}
              className="bg-[#111827] text-white"
            >
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Bug Description */}

      <div>
        <label className="mb-2 block font-medium text-ink">
          Bug Description
        </label>

        <textarea
          rows={5}
          value={bugDescription}
          onChange={(e) => setBugDescription(e.target.value)}
          placeholder="Describe the bug..."
          required
          className="w-full rounded-xl border border-base-border bg-[#111827] p-3 text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {/* Monaco Editor */}

      <div>

        <div className="mb-3 flex items-center justify-between">

          <label className="font-medium text-ink">
            Source Code
          </label>

          <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-400">
            VS Code Editor
          </span>

        </div>

        <div className="overflow-hidden rounded-xl border border-base-border shadow-xl">

          <Editor
            height="300px"
            language={languageMap[language] || "javascript"}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 14,
              wordWrap: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              tabSize: 2,
              formatOnPaste: true,
              formatOnType: true,
              roundedSelection: false,
              cursorBlinking: "smooth",
              smoothScrolling: true,
              lineNumbers: "on",
              padding: {
                top: 15,
              },
            }}
          />

        </div>

      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={loading}
      >
        {loading ? "Analyzing..." : "🚀 Analyze Bug"}
      </Button>

    </form>
  );
};

export default AnalysisForm;