import { jsPDF } from "jspdf";

export const generateAnalysisPDF = (analysis) => {
  const doc = new jsPDF();

  const ai = analysis.aiResponse;

  let y = 20;

  doc.setFontSize(22);
  doc.text("DebugMind AI", 20, y);

  y += 10;

  doc.setFontSize(16);
  doc.text("Bug Analysis Report", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(`Title: ${analysis.title}`, 20, y);
  y += 8;

  doc.text(`Language: ${analysis.language}`, 20, y);
  y += 8;

  doc.text(`Status: ${analysis.status}`, 20, y);
  y += 15;

  doc.setFont(undefined, "bold");
  doc.text("Problem", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  const problem = doc.splitTextToSize(ai.problem || "", 170);

  doc.text(problem, 20, y);

  y += problem.length * 7 + 10;

  doc.setFont(undefined, "bold");
  doc.text("Reason", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  const reason = doc.splitTextToSize(ai.reason || "", 170);

  doc.text(reason, 20, y);

  y += reason.length * 7 + 10;

  doc.setFont(undefined, "bold");
  doc.text("Fixed Code", 20, y);

  y += 8;

  doc.setFont("courier", "normal");

  const code = doc.splitTextToSize(ai.fixedCode || "", 170);

  doc.text(code, 20, y);

  y += code.length * 5 + 10;

  doc.setFont(undefined, "bold");
  doc.text("Best Practices", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  ai.bestPractices.forEach((item) => {
    const text = doc.splitTextToSize("• " + item, 170);

    doc.text(text, 20, y);

    y += text.length * 6;
  });

  y += 8;

  doc.setFont(undefined, "bold");
  doc.text("Performance Improvements", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  ai.performanceImprovements.forEach((item) => {
    const text = doc.splitTextToSize("• " + item, 170);

    doc.text(text, 20, y);

    y += text.length * 6;
  });

  y += 8;

  doc.setFont(undefined, "bold");
  doc.text("Security Issues", 20, y);

  y += 8;

  doc.setFont(undefined, "normal");

  ai.securityIssues.forEach((item) => {
    const text = doc.splitTextToSize("• " + item, 170);

    doc.text(text, 20, y);

    y += text.length * 6;
  });

  y += 10;

  doc.setFontSize(10);

  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    20,
    y
  );

  doc.save("DebugMind-Analysis.pdf");
};