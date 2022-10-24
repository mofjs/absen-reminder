export interface Story {
  "by": string;
  "descendants": number;
  "id": number;
  "kids": number[];
  "score": number;
  "time": number;
  "title": string;
  "type": string;
  "url": string;
}

export async function getStory() {
  try {
    const response_top_stories = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
    );
    if (response_top_stories.ok) {
      const top_stories = await response_top_stories.json() as number[];
      const resp_top_story = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${
          top_stories[0]
        }.json?print=pretty`,
      );
      if (resp_top_story.ok) {
        return await resp_top_story.json() as Story;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
