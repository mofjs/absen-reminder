export interface Quote {
  "id": string;
  "author": string;
  "en": string;
}

export async function getQuote() {
  try {
    const response = await fetch(
      "https://programming-quotes-api.herokuapp.com/quotes/random",
    );
    if (!response.ok) {
      throw Error("Invalid server response.");
    }
    const quote = await response.json() as Quote;
    return `\`\`\`${quote?.en}
    -- ${quote?.author}
    \`\`\``;
  } catch (error) {
    return `Error getQuote: ${error}`;
  }
}
