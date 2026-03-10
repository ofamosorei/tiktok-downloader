import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required", success: false }, { status: 400 });
    }

    // Try to get video details using the reliable TikWM API
    const tikwmApiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await fetch(tikwmApiUrl);
    const data = await response.json();

    if (data.code !== 0 || !data.data) {
        return NextResponse.json({ error: "Could not fetch video data. The video might be private or deleted.", success: false }, { status: 404 });
    }

    const { data: videoInfo } = data;

    return NextResponse.json({
        success: true,
        videoUrl: videoInfo.play, // The URL to the video source without watermark
        title: videoInfo.title || "TikTok Video",
        author: videoInfo.author?.nickname || videoInfo.author?.unique_id || "Unknown Author",
        duration: videoInfo.duration || 0,
        cover: videoInfo.cover || "",
    });

  } catch (error) {
    console.error("Error downloading TikTok:", error);
    return NextResponse.json(
      { error: "Failed to process the requested URL. Please ensure it's a valid TikTok link.", success: false },
      { status: 500 }
    );
  }
}
