interface JokeResult {
  error: boolean;
  category: string;
  type: "single" | "twopart";
  joke: string;
  setup: string;
  delivery: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export async function getJoke() {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming,Miscellaneous?safe-mode",
    );
    if (!response.ok) {
      throw Error("Invalid server response.");
    }
    const result = await response.json() as JokeResult;
    if (result.type === "single") {
      return `🤓: ${result.joke}`;
    }
    return `🤔: ${result.setup}\n🤭: ${result.delivery}`;
  } catch (error) {
    return `Error getJoke: ${error}`;
  }
}
