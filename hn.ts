import { kv } from "./kv.ts";
const API_URL = "https://hacker-news.firebaseio.com/";

type ItemId = StoryId | CommentId | PollId | PollOptId | JobId;
type StoryId = number;
type CommentId = number;
type PollId = number;
type PollOptId = number;
type JobId = number;

type Item = Job | Story | Comment | Poll | PollOpt;

interface ItemBase {
  "id": ItemId;
  "deleted"?: true;
  "dead"?: true;
  "by": string;
  "time": number;
}

interface Story extends ItemBase {
  type: "story";
  score: number;
  descendants: number;
  kids: CommentId[];
  title: string;
  url: string;
  text: string;
}

interface Comment extends ItemBase {
  type: "comment";
  parent: StoryId | CommentId;
  kids: CommentId[];
  text: string;
}

interface Poll extends ItemBase {
  type: "poll";
  score: number;
  descendants: number;
  kids: CommentId[];
  parts: PollOptId[];
  title: string;
  text: string;
}

interface PollOpt extends ItemBase {
  type: "pollopt";
  poll: PollId;
  score: number;
  text: string;
}

interface Job extends ItemBase {
  type: "job";
  score: number;
  title: string;
  text: string;
  url: string;
}

async function hasDuplicate(id: ItemId) {
  const result = await kv.get<boolean>(["hn", id]);
  return !!result.value;
}

async function setDuplicate(id: ItemId) {
  await kv.set(["hn", id], true);
}

async function getBestStories() {
  const response = await fetch(API_URL + "/v0/beststories.json");
  return await response.json() as ItemId[];
}

async function getItem(id: ItemId) {
  const response = await fetch(API_URL + `/v0/item/${id}.json`);
  return await response.json() as Item;
}

export async function getStory() {
  try {
    const storyIds = await getBestStories();
    let story: Story | null = null;
    for (const id of storyIds) {
      if (await hasDuplicate(id)) continue;
      else {
        const item = await getItem(id);
        if (item.type === "story") {
          story = item;
          await setDuplicate(id);
          break;
        }
      }
    }
    return `TopHN: 📰 ${story?.title} (${story?.url})`;
  } catch (error) {
    return `Error getHN: ${error}`;
  }
}
