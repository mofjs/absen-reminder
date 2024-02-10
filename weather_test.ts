import { assertEquals } from "$std/assert/assert_equals.ts";
import { parseWeatherCode } from "./weather.ts";

Deno.test(function parseWeatherCodeTest() {
  assertEquals(parseWeatherCode(0), "☀️ Cerah");
});
