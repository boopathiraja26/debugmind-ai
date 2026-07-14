import { useState } from "react";
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
          className="w-full rounded-lg border border-base-border bg-[#111827] p-3 text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
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
          className="w-full rounded-lg border border-base-border bg-[#111827] p-3 text-white focus:border-brand-500 focus:outline-none"
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
          className="w-full rounded-lg border border-base-border bg-[#111827] p-3 text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {/* Code */}
      <div>
        <label className="mb-2 block font-medium text-ink">
          Source Code
        </label>

        <textarea
          rows={14}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          required
          className="w-full rounded-lg border border-base-border bg-[#111827] p-3 font-mono text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Bug"}
      </Button>
    </form>
  );
};

export default AnalysisForm;