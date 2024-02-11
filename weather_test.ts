import { assertEquals } from "$std/assert/assert_equals.ts";
import { fetchWeather, parseWeatherCode } from "./weather.ts";

Deno.test(async function fetchWeatherTest() {
  const response = await fetchWeather("-6,1818", "106,8223", "Asia/Jakarta");
  console.log(response);
  for (const key in response) {
    assertEquals(typeof response[key as keyof typeof response], "number");
  }
});

Deno.test(function parseWeatherCodeTest() {
  assertEquals(parseWeatherCode(0), "☀️ Cerah");
});
