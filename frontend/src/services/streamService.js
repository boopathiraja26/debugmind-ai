let eventSource = null;

export const connectAnalysisStream = (
  onMessage,
  onComplete,
  onError
) => {
  eventSource = new EventSource(
    `${import.meta.env.VITE_API_URL}/stream`,
    {
      withCredentials: true,
    }
  );

  eventSource.addEventListener("connected", (event) => {
    console.log("SSE Connected");
  });

  eventSource.addEventListener("progress", (event) => {
    const data = JSON.parse(event.data);
    onMessage(data.message);
  });

  eventSource.addEventListener("complete", (event) => {
    const data = JSON.parse(event.data);

    onComplete(data);

    eventSource.close();
  });

  eventSource.addEventListener("error", () => {
    onError();

    eventSource.close();
  });
};

export const closeAnalysisStream = () => {
  if (eventSource) {
    eventSource.close();
  }
};