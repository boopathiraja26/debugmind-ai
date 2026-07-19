import { useState } from "react";
import Editor from "@monaco-editor/react";
import Button from "../ui/Button";
import { useDropzone } from "react-dropzone";

const TASKS = [
  "Bug Analysis",
  "Explain Code",
  "Code Review",
  "Performance Review",
  "Security Audit",
  "Generate Documentation",
  "Generate Unit Tests",
  "Optimize Code",
  "Ask AI",
];

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
  const [task, setTask] = useState("Bug Analysis");
  const [language, setLanguage] = useState("JavaScript");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [code, setCode] = useState("");
  const [projectFiles, setProjectFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
  setProjectFiles(acceptedFiles);
};

const {
  getRootProps,
  getInputProps,
  isDragActive,
} = useDropzone({
  onDrop,
});

  const submitHandler = (e) => {
    e.preventDefault();

    onAnalyze({
      title,
      task,
      language,
      repositoryUrl,
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

      {/* Task */}

      <div>
        <label className="mb-2 block font-medium text-ink">
          AI Task
        </label>

        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full rounded-xl border border-base-border bg-[#111827] p-3 text-white focus:border-brand-500 focus:outline-none"
        >
          {TASKS.map((item) => (
            <option
              key={item}
              value={item}
              className="bg-[#111827]"
            >
              {item}
            </option>
          ))}
        </select>
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
              className="bg-[#111827]"
            >
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* GitHub Repository */}

      <div>
        <label className="mb-2 block font-medium text-ink">
          GitHub Repository (Optional)
        </label>

        <input
          type="url"
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          placeholder="https://github.com/facebook/react"
          className="w-full rounded-xl border border-base-border bg-[#111827] p-3 text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
  <label className="mb-2 block font-medium text-ink">
    Upload Project (Optional)
  </label>

  <div
    {...getRootProps()}
    className="cursor-pointer rounded-xl border-2 border-dashed border-base-border p-8 text-center"
  >
    <input {...getInputProps()} />

    {isDragActive ? (
      <p>Drop project here...</p>
    ) : (
      <p>Drag & Drop project files here</p>
    )}
  </div>

  {projectFiles.length > 0 && (
    <div className="mt-3 text-sm text-green-500">
      {projectFiles.length} file(s) selected
    </div>
  )}
</div>

      {/* Bug Description */}

      <div>
        <label className="mb-2 block font-medium text-ink">
          Description
        </label>

        <textarea
          rows={5}
          value={bugDescription}
          onChange={(e) => setBugDescription(e.target.value)}
          placeholder="Describe your issue or ask your question..."
          required
          className="w-full rounded-xl border border-base-border bg-[#111827] p-3 text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {/* Monaco */}

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
            height="350px"
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
        {loading ? "Analyzing..." : "🚀 Analyze with AI Agent"}
      </Button>

    </form>
  );
};

export default AnalysisForm;