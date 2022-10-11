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
    if (response.ok) {
      return await response.json() as Quote;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
