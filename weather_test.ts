import { assertEquals } from "$std/testing/asserts.ts";
import { parseWeatherCode } from "./weather.ts";

Deno.test(function parseWeatherCodeTest() {
  assertEquals(parseWeatherCode(0), "☀️ - Cerah");
});
