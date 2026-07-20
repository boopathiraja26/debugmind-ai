import { API_BASE_URL } from "../utils/constants";
import { getToken } from "../utils/token";

let eventSource = null;

export const connectAnalysisStream = (
  onMessage,
  onComplete,
  onError
) => {
  const token = getToken();

  if (!token) {
    console.error("No authentication token found.");
    return;
  }

  // Close previous connection if one exists
  if (eventSource) {
    eventSource.close();
  }

  eventSource = new EventSource(
    `${API_BASE_URL}/stream?token=${encodeURIComponent(token)}`
  );

  eventSource.addEventListener("connected", () => {
    console.log("✅ SSE Connected");
  });

  eventSource.addEventListener("progress", (event) => {
    const data = JSON.parse(event.data);
    onMessage(data.message);
  });

  eventSource.addEventListener("complete", (event) => {
    const data = JSON.parse(event.data);

    onComplete(data);

    eventSource.close();
    eventSource = null;
  });

  eventSource.addEventListener("error", (event) => {
    console.error("❌ SSE Error:", event);

    onError();

    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  });
};

export const closeAnalysisStream = () => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
};