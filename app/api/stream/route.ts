// Next.js API route for streaming audio
import { NextResponse } from 'next/server';

export async function GET() {
  // In production, this should proxy to your Icecast/streaming server
  // For demo, we'll return info about how to set up streaming

  return NextResponse.json({
    status: "ready",
    message: "Stream endpoint configured",
    streamUrl: process.env.NEXT_PUBLIC_STREAM_URL || null,
    instructions: {
      local: "Run ./full_start.sh to start local streaming",
      production: "Set NEXT_PUBLIC_STREAM_URL env var to your stream URL"
    },
    currentPlaylist: "AI-Curated Billboard Hot 100",
    trackCount: 15,
    updated: new Date().toISOString()
  });
}
