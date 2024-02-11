import "$std/dotenv/load.ts";
import { isLibur } from "./date.ts";

import { getToday } from "./date.ts";
import { getStory } from "./hn.ts";
import { sendText } from "./wa.ts";
import { getWeather } from "./weather.ts";

const greeting = "Mengingatkan rekan-rekan untuk melakukan presensi~";
const chatJid = Deno.env.get("CHAT_ID")!;

export function createMessage() {
  const messages = [getToday(), greeting, getWeather(), getStory()];
  return Promise.all(messages).then((s) => s.join("\n\n"));
}

async function main() {
  if (await isLibur()) return;
  const message = await createMessage();
  console.log(message);
  await sendText(chatJid, message);
}

if (import.meta.main) {
  Deno.cron("clockin", "30 0 * * 2-6", main);
  Deno.cron("clockout", "0 10 * * 2-6", main);
}
