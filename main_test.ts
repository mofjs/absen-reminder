import { assertEquals } from "$std/assert/assert_equals.ts";

Deno.test(function alwayTrue() {
  assertEquals(true, true);
});
