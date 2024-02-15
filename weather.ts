import { fetchWeatherApi } from "openmeteo";

const API_URL = "https://api.open-meteo.com/v1/forecast";

const LATITUDE = Deno.env.get("LATITUDE") ?? "-6.1862";
const LONGITUDE = Deno.env.get("LONGITUDE") ?? "106.8063";
const TIMEZONE = Deno.env.get("TIMEZONE") ?? "Asia/Jakarta";

export async function getWeather() {
  try {
    const { temperature, humidity, precipitation, weatherCode, windSpeed } =
      await fetchWeather(LATITUDE, LONGITUDE, TIMEZONE);

    return [
      "```",
      `Cuaca       : ${parseWeatherCode(weatherCode)}`,
      `Curah Hujan : 🚿 ${precipitation} mm`,
      `Suhu        : 🌡 ${temperature.toFixed(1)} °C`,
      `Kelembapan  : 💧 ${humidity.toFixed(0)} %`,
      `Angin       : 🍃 ${windSpeed.toFixed(1)} km/jam`,
      "```"
    ].join("\n");
  } catch (error) {
    return `Error getWeather: ${error}`;
  }
}

export async function fetchWeather(
  latitude: string,
  longitude: string,
  timezone: string,
) {
  const params = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    timezone,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ],
  };
  const responses = await fetchWeatherApi(API_URL, params);
  const current = responses.at(0)?.current();
  if (!current) throw new Error("No Weather Response!");
  return {
    temperature: current.variables(0)!.value(),
    humidity: current.variables(1)!.value(),
    precipitation: current.variables(2)!.value(),
    weatherCode: current.variables(3)!.value(),
    windSpeed: current.variables(4)!.value(),
  };
}

export function parseWeatherCode(code?: number) {
  switch (code) {
    case 0:
      return "☀️ Cerah";
    case 1:
      return "🌤 Cerah Berawan";
    case 2:
      return "⛅ Berawan";
    case 3:
      return "🌥 Mendung";
    case 45:
    case 48:
      return "🌫 Kabut";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "🌦 Gerimis";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return "☂️ Hujan";
    case 71:
    case 73:
    case 75:
    case 77:
      return "🌨 Salju";
    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return "☔ Deras";
    case 95:
    case 96:
    case 99:
      return "⛈ Badai";
    default:
      return "??";
  }
}
