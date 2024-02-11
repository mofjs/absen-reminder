import { assertStringIncludes } from "$std/assert/assert_string_includes.ts";
import { createMessage } from "./main.ts";

Deno.test(async function createMessageTest() {
  const message = await createMessage();
  assertStringIncludes(message, "presensi");
});
