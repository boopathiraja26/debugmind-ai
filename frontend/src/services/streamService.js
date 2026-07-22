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
    console.error("No token found.");
    return;
  }

  if (eventSource) {
    eventSource.close();
  }

  eventSource = new EventSource(
    `${API_BASE_URL}/stream?token=${encodeURIComponent(token)}`
  );

  eventSource.onopen = () => {
    console.log("✅ SSE Connected");
  };

  eventSource.addEventListener("connected", (event) => {
    console.log("Connected:", event.data);
  });

  eventSource.addEventListener("progress", (event) => {
    const data = JSON.parse(event.data);
    onMessage(data.message);
  });

  eventSource.addEventListener("complete", (event) => {
    const data = JSON.parse(event.data);

    onComplete(data);

    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  });

  eventSource.onerror = (err) => {
    console.error("SSE Error:", err);

    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }

    onError();
  };
};

export const closeAnalysisStream = () => {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
};