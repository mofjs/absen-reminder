const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-6.1862&longitude=106.8063&current_weather=true&timezone=Asia%2FBangkok";

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
}

export async function getWeather() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw Error("Invalid server response.");
  }
  return await response.json() as WeatherResponse;
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
