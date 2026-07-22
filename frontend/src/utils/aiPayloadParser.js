export const parsePromptToPayload = (
  prompt = "",
  repositoryUrl = "",
  projectFiles = []
) => {
  prompt = prompt.trim();

  const title =
    prompt.length > 50
      ? prompt.substring(0, 50)
      : prompt || "AI Analysis";

  let bugDescription = prompt;

  let code = "";

  // Detect markdown code block
  const markdownMatch = prompt.match(/```(\w+)?\n([\s\S]*?)```/);

  if (markdownMatch) {
    code = markdownMatch[2].trim();

    bugDescription = prompt
      .replace(markdownMatch[0], "")
      .trim();
  }

  // No markdown?
  // Treat the whole prompt as BOTH description and code.
  else {
    code = prompt;
  }

  // fallback

  if (!bugDescription || bugDescription.length < 10) {
    bugDescription =
      prompt ||
      "Please analyze this code and explain the issue.";
  }

  if (!code || code.length === 0) {
    code = prompt;
  }

  let language = "Plain Text";

  const lower = prompt.toLowerCase();

  if (lower.includes("react")) language = "React";
  else if (lower.includes("javascript")) language = "JavaScript";
  else if (lower.includes("node")) language = "Node.js";
  else if (lower.includes("express")) language = "Express";
  else if (lower.includes("python")) language = "Python";
  else if (lower.includes("java")) language = "Java";
  else if (lower.includes("c++")) language = "C++";
  else if (lower.includes("c#")) language = "C#";
  else if (lower.includes("sql")) language = "SQL";
  else if (lower.includes("html")) language = "HTML";
  else if (lower.includes("css")) language = "CSS";

  let task = "Bug Analysis";

  if (lower.includes("review"))
    task = "Code Review";

  if (lower.includes("security"))
    task = "Security Audit";

  if (lower.includes("performance"))
    task = "Performance Review";

  if (lower.includes("optimize"))
    task = "Optimize Code";

  if (lower.includes("explain"))
    task = "Explain Code";

  if (lower.includes("documentation"))
    task = "Generate Documentation";

  if (lower.includes("test"))
    task = "Generate Unit Tests";

  if (projectFiles.length > 0) {
    code += `\n\nUploaded ${projectFiles.length} project file(s).`;
  }

  return {
    title,
    task,
    language,
    bugDescription,
    code,
    repositoryUrl,
  };
};