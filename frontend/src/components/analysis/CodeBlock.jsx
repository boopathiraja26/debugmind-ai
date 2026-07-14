import { useState } from "react";

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-base-border bg-[#0d1117]">

      <div className="flex items-center justify-between border-b border-base-border px-4 py-3">

        <span className="text-sm font-medium text-gray-300">
          Fixed Code
        </span>

        <button
          onClick={copyCode}
          className="rounded-md bg-brand-500 px-3 py-1 text-sm font-medium text-white transition hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy"}
        </button>

      </div>

      <pre className="overflow-x-auto p-5 text-sm leading-7 text-green-400">
        <code>{code}</code>
      </pre>

    </div>
  );
};

export default CodeBlock;