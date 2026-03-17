import { NextResponse } from 'next/server';

export async function GET() {
  // Return stream info - actual audio comes from Cloudflare Tunnel
  return NextResponse.json({
    status: "online",
    streamUrl: process.env.STREAM_URL || null,
    currentPlaylist: "AI-Curated Billboard Hot 100",
    trackCount: 10,
    loopMode: "infinite",
    updated: new Date().toISOString(),
    instructions: "Set STREAM_URL env var to your Cloudflare Tunnel URL"
  });
}
