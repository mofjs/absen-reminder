import { kv } from "./kv.ts";

export function getToday() {
  return new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function isLibur() {
  const date = new Date().toISOString().substring(0, 10);
  const result = await kv.get<string>(["libur", date]);
  return !!result.value;
}
