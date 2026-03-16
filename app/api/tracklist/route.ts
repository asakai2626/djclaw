import { NextResponse } from 'next/server';

export async function GET() {
  const tracks = [
    { title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", bpm: 120, energy: 0.7 },
    { title: "Espresso", artist: "Sabrina Carpenter", bpm: 128, energy: 0.8 },
    { title: "Beautiful Things", artist: "Benson Boone", bpm: 100, energy: 0.6 },
    { title: "I Had Some Help", artist: "Post Malone ft. Morgan Wallen", bpm: 85, energy: 0.5 },
    { title: "Too Sweet", artist: "Hozier", bpm: 95, energy: 0.4 },
    { title: "Cruel Summer", artist: "Taylor Swift", bpm: 128, energy: 0.9 },
    { title: "Stick Season", artist: "Noah Kahan", bpm: 90, energy: 0.4 },
    { title: "Texas Hold 'Em", artist: "Beyoncé", bpm: 110, energy: 0.7 },
    { title: "End of Beginning", artist: "Djo", bpm: 120, energy: 0.6 },
    { title: "Lose Control", artist: "Teddy Swims", bpm: 95, energy: 0.7 },
    { title: "Greedy", artist: "Tate McRae", bpm: 118, energy: 0.8 },
    { title: "Lovin On Me", artist: "Jack Harlow", bpm: 105, energy: 0.7 },
    { title: "Paint The Town Red", artist: "Doja Cat", bpm: 122, energy: 0.8 },
    { title: "Flowers", artist: "Miley Cyrus", bpm: 118, energy: 0.6 },
    { title: "Vampire", artist: "Olivia Rodrigo", bpm: 135, energy: 0.5 },
  ];

  return NextResponse.json({
    station: "DJ Claw Radio",
    status: "online",
    mode: "infinite_stream",
    tracks,
    currentPlaylist: "AI-Curated Billboard Hot 100",
    updated: new Date().toISOString()
  });
}
