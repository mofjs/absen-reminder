export async function sendText(to: string, content: string) {
  const response = await fetch("http://localhost:3000/" + to, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "text/plain",
    },
    body: content,
  });
  return response.ok;
}
