export interface Quote {
  "id": string;
  "author": string;
  "en": string;
}

export async function getQuote() {
  const response = await fetch(
    "https://programming-quotes-api.herokuapp.com/quotes/random",
  );
  if (!response.ok) {
    throw Error("Invalid server response.");
  }
  return await response.json() as Quote;
}
