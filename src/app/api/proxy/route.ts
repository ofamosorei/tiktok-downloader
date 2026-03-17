import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    
    let extension = "mp4";
    if (contentType.includes("image/jpeg") || contentType.includes("image/jpg")) extension = "jpg";
    else if (contentType.includes("image/png")) extension = "png";
    else if (contentType.includes("image/webp")) extension = "webp";

    const contentDisposition = `attachment; filename="download_${Date.now()}.${extension}"`;

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDisposition,
      },
    });
  } catch (error) {
    console.error("Proxy download error:", error);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
