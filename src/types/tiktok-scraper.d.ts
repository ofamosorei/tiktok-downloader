declare module "tiktok-scraper-without-watermark" {
  export interface TiktokScraperResponse {
    video: string;
    title?: string;
    author?: {
      nickname?: string;
      unique_id?: string;
    };
    cover?: string;
    [key: string]: any;
  }

  export function tikdown(url: string): Promise<TiktokScraperResponse>;
}
