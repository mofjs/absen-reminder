const API_URL = "https://service.kemenkeu.go.id/mobile/portal/InternalNews";
const MEDIA_URL =
  "https://service.kemenkeu.go.id/mobile/portal/InternalNews/GetMedias/";

export interface News {
  PostId: number;
  PageId: number;
  Title: string;
  Content: string;
  State: string;
  UrlPath: string;
  PublishedDate: string;
  Languange: string;
  CreatedAt: string;
  CreatedBy: number;
  UpdatedAt?: string;
  UpdatedBy?: number;
  Image: string;
  ImageData: ImageData;
  Keyword: unknown;
  Category: unknown;
  Page: unknown;
}

export interface ImageData {
  MediaId: string;
  FileName: string;
  Size: number;
  CreatedAt: string;
  CreatedBy: number;
  Type: string;
  Path: string;
  Ext: string;
}

interface ApiResponse<T> {
  Data: T[];
  Errors: unknown;
  Success: boolean;
  Message: string;
}

export async function get_info() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const api_response = await response.json() as ApiResponse<News>;
      return api_response.Data;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function get_media(mediaId: string) {
  try {
    const response = await fetch(MEDIA_URL + mediaId);
    if (response.ok) {
      return await response.blob();
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
