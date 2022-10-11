export async function sendText(api_key: string, to: unknown, content: string) {
  const response = await fetch("http://localhost:8002/sendText", {
    method: "POST",
    headers: {
      accept: "*/*",
      api_key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      args: {
        to,
        content,
      },
    }),
  });
  return response.ok;
}
