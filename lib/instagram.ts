interface DownloadResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
}

export async function getReelVideoUrl(url: string): Promise<DownloadResult> {
  try {
    if (!url.includes('instagram.com')) {
      return { success: false, error: 'Invalid Instagram URL' };
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    const apiHost = process.env.RAPIDAPI_HOST;

    if (!apiKey) {
      return { success: false, error: 'API key not configured' };
    }

    // Correct endpoint: /scraper with url query parameter
    const apiUrl = `https://${apiHost}/scraper?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      return { success: false, error: `API error: ${response.status}` };
    }

    const data = await response.json();
    console.log('API Response:', data);

    // Extract video URL from response
    // Response structure: { data: [{ media: "video_url", isVideo: true }] }
    const videoItem = data?.data?.find((item: any) => item.isVideo === true);
    const videoUrl = videoItem?.media;

    if (!videoUrl) {
      return { success: false, error: 'No video found in API response' };
    }

    return { success: true, videoUrl };
  } catch (error) {
    console.error('Exception:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Download failed'
    };
  }
}