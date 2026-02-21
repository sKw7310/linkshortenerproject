import { NextRequest, NextResponse } from 'next/server';
import { getLinkByShortCode, incrementLinkClicks } from '@/data/links';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  try {
    const { shortcode } = await params;

    // Look up the link by short code
    const link = await getLinkByShortCode(shortcode);

    if (!link) {
      return new NextResponse('Link not found', { status: 404 });
    }

    // Increment clicks asynchronously (don't wait for it)
    incrementLinkClicks(shortcode).catch((error) => {
      console.error('Failed to increment clicks:', error);
    });

    // Redirect to the original URL
    return NextResponse.redirect(link.originalUrl, { status: 307 });
  } catch (error) {
    console.error('Error in redirect handler:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
