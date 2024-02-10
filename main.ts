import "$std/dotenv/load.ts";

import { sendText } from "./wa.ts";
import { getWeather } from "./weather.ts";
import { getStory } from "./hn.ts";

async function main() {
  const CHAT_ID = Deno.env.get("CHAT_ID");
  if (!CHAT_ID) {
    throw new Error("CHAT_ID environment variable is required.");
  }
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const greeting = "Mengingatkan rekan-rekan untuk melakukan presensi~";
  const weather = await getWeather();
  const story = await getStory();
  const message = [today, greeting, weather, story].join("\n\n");

  console.log(message);

  await sendText(CHAT_ID, message);
}

if (import.meta.main) {
  Deno.cron("clockin", "30 0 * * 2-6", main);
  Deno.cron("clockout", "0 10 * * 2-6",{}, main);
}
