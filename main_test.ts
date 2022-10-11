import { assertEquals } from "$std/testing/asserts.ts";

Deno.test(function alwayTrue() {
  assertEquals(true, true);
});
