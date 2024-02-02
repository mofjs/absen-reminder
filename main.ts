import "$std/dotenv/load.ts";

import { sendText } from "./wa.ts";
import { getWeather } from "./weather.ts";
import { getStory } from "./hn.ts";
import { getJoke } from "./joke.ts";

const CHAT_ID = Deno.env.get("CHAT_ID");
if (!CHAT_ID) {
  console.error("[ERROR] The CHAT_ID environment variable is required.");
  Deno.exit(1);
}

async function main() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const message = `${today}

Mengingatkan rekan-rekan untuk melakukan presensi.

${await getWeather()}

${await getJoke()}

${await getStory()}
`;

  console.log(message);

  await sendText(CHAT_ID!, message);
}

if (import.meta.main) {
  Deno.cron("clockin", "30 0 * * 1-5", main);
  Deno.cron("clockout", "0 10 * * 1-5", main);
}
