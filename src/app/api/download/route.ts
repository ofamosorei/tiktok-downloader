import { NextRequest, NextResponse } from "next/server";
import { tikdown } from "tiktok-scraper-without-watermark";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required", success: false }, { status: 400 });
    }

    // Try to get video details using the scraper
    const data = await tikdown(url);

    if (!data || !data.video) {
        return NextResponse.json({ error: "Could not fetch video data", success: false }, { status: 404 });
    }

    // Usually TikTok URLs redirect to the actual video page which has an ID
    // So we just take the details and format them into the response
    return NextResponse.json({
        success: true,
        videoUrl: data.video, // The URL to the video source without watermark
        title: data.title || "TikTok Video",
        author: data.author?.nickname || data.author?.unique_id || "Unknown Author",
        duration: 0, // scraper doesn't typically provide this easily without deep inspection
        cover: data.cover || "",
    });

  } catch (error) {
    console.error("Error downloading TikTok:", error);
    return NextResponse.json(
      { error: "Failed to process the requested URL. Please ensure it's a valid TikTok link.", success: false },
      { status: 500 }
    );
  }
}
