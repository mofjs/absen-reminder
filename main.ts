import "$std/dotenv/load.ts";
import { sendText } from "./open-wa.ts";
import { getWeather } from "./weather.ts";
import { getQuote } from "./quote.ts";
import { getStory } from "./hn.ts";

const API_KEY = Deno.env.get("API_KEY");
if (!API_KEY) {
  console.error("[ERROR] The API_KEY environment variable is required.");
  Deno.exit(1);
}
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

${await getQuote()}

${await getStory()}
`;

  console.log(message);

  await sendText(API_KEY!, CHAT_ID, message);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
