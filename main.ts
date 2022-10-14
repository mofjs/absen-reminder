import { sendText } from "./open-wa.ts";
import { getWeather, parseWeatherCode } from "./weather.ts";

import "$std/dotenv/load.ts";
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
  const weather = await getWeather();
  const quote = await getQuote();
  const story = await getStory();
  const message = `${today}

Mengingatkan rekan-rekan untuk melakukan absensi.

Cuaca: ${parseWeatherCode(weather?.current_weather.weathercode)}
Suhu : 🌡 ${weather?.current_weather.temperature} °C
Angin: 🍃 ${weather?.current_weather.windspeed} km/jam

\`\`\`${quote?.en}
-- ${quote?.author}
\`\`\`

Top HN News: 📰 story.title (story.url) 

`;

  console.log(message);

  await sendText(API_KEY!, CHAT_ID, message);
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
