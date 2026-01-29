import { NextRequest, NextResponse } from 'next/server';
import { getReelVideoUrl } from '@/lib/instagram';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Get video URL from Instagram
    const result = await getReelVideoUrl(url);

    // Log debug info
    console.log('Instagram result:', result);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Fetch video from Instagram
    const videoResponse = await fetch(result.videoUrl!, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      }
    });
    
    if (!videoResponse.ok) {
      return NextResponse.json(
        { error: `Video fetch failed: ${videoResponse.status}` },
        { status: 500 }
      );
    }

    const videoBuffer = await videoResponse.arrayBuffer();

    // Return video file
    return new NextResponse(videoBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="reel.mp4"',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Server error', debug: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}