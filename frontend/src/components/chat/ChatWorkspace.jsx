import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatThinking from "./ChatThinking";
import ChatResponse from "./ChatResponse";

import { createAnalysis } from "../../services/analysisService";
import {
  connectAnalysisStream,
  closeAnalysisStream,
} from "../../services/streamService";
import { parsePromptToPayload } from "../../utils/aiPayloadParser";

const ChatWorkspace = () => {
  const [loading, setLoading] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const [currentSteps, setCurrentSteps] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [interactions, currentSteps, loading]);

  useEffect(() => {
    connectAnalysisStream(
      (message) => {
        setCurrentSteps((prev) => [...prev, message]);
      },
      () => {},
      () => {
        console.log("SSE Closed");
      }
    );

    return () => {
      closeAnalysisStream();
    };
  }, []);

  const handleSend = async ({
    prompt,
    repositoryUrl,
    projectFiles,
  }) => {
    try {
      setLoading(true);
      setCurrentSteps([]);

      // Show user message
      setInteractions((prev) => [
        ...prev,
        {
          type: "user",
          content: prompt || "Uploaded files for analysis.",
        },
      ]);

      // Parse payload
      const payload = parsePromptToPayload(
        prompt,
        repositoryUrl,
        projectFiles
      );
      console.log("PAYLOAD:", payload);

      console.log("========== PAYLOAD ==========");
      console.log(payload);
      console.log("=============================");

      // Send request
      const response = await createAnalysis(payload);

      console.log("========== RESPONSE ==========");
      console.log(response);
      console.log("==============================");

      const analysisData =
        response?.data?.data?.analysis ||
        response?.data?.analysis ||
        response?.analysis;

      setInteractions((prev) => [
        ...prev,
        {
          type: "ai",
          analysis: analysisData,
        },
      ]);

      toast.success("Analysis completed successfully!");
    } catch (err) {
      console.log("========== FULL ERROR ==========");
      console.log(err);

      console.log("========== RESPONSE ==========");
      console.log(err.response);

      console.log("========== RESPONSE DATA ==========");
      console.log(err.response?.data);

      console.log("========== VALIDATION ERRORS ==========");
      console.log(err.response?.data?.errors);

      console.log("========== MESSAGE ==========");
      console.log(err.response?.data?.message);

      setInteractions((prev) => [
        ...prev,
        {
          type: "error",
          content: "Sorry, I encountered an error during analysis.",
        },
      ]);

      toast.error(
        err.response?.data?.errors?.join("\n") ||
          err.response?.data?.message ||
          "Analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col">
          {interactions.length === 0 ? (
            <div className="my-20 flex flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500/10 text-4xl shadow-xl">
                🧠
              </div>

              <h1 className="mb-2 text-3xl font-bold text-ink">
                How can I help you today?
              </h1>

              <p className="max-w-md text-ink-muted">
                Paste your code, describe a bug, or ask for a
                security audit. I'll automatically detect the
                language and context.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {interactions.map((interaction, index) => {
                if (interaction.type === "user") {
                  return (
                    <ChatMessage
                      key={index}
                      message={interaction.content}
                    />
                  );
                }

                if (interaction.type === "ai") {
                  return (
                    <ChatResponse
                      key={index}
                      analysis={interaction.analysis}
                    />
                  );
                }

                if (interaction.type === "error") {
                  return (
                    <div
                      key={index}
                      className="my-4 rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-red-400"
                    >
                      {interaction.content}
                    </div>
                  );
                }

                return null;
              })}

              {loading && (
                <ChatThinking steps={currentSteps} />
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-base-border bg-base/80 p-4 backdrop-blur-xl">
        <ChatInput
          onSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ChatWorkspace;