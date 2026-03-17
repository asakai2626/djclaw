'use client';

import { useState, useEffect, useRef } from 'react';

const tracks = [
  { title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", bpm: 120, energy: 0.7 },
  { title: "Espresso", artist: "Sabrina Carpenter", bpm: 128, energy: 0.8 },
  { title: "Beautiful Things", artist: "Benson Boone", bpm: 100, energy: 0.6 },
  { title: "Cruel Summer", artist: "Taylor Swift", bpm: 128, energy: 0.9 },
  { title: "Paint The Town Red", artist: "Doja Cat", bpm: 122, energy: 0.8 },
  { title: "Flowers", artist: "Miley Cyrus", bpm: 118, energy: 0.6 },
  { title: "Vampire", artist: "Olivia Rodrigo", bpm: 135, energy: 0.5 },
  { title: "Greedy", artist: "Tate McRae", bpm: 118, energy: 0.8 },
  { title: "Lovin On Me", artist: "Jack Harlow", bpm: 105, energy: 0.7 },
  { title: "Lose Control", artist: "Teddy Swims", bpm: 95, energy: 0.7 },
];

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(80);
  const [status, setStatus] = useState('Connecting...');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracklist, setTracklist] = useState<any>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Auto-start on mount
  useEffect(() => {
    // Fetch tracklist
    fetch('/api/tracklist')
      .then(r => r.json())
      .then(data => {
        setTracklist(data);
        setStatus('Ready');
      })
      .catch(err => {
        console.error('Failed to fetch tracklist:', err);
      });

    // Auto-play
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setStatus('🎵 Now Streaming');
          })
          .catch(err => {
            console.error('Auto-play failed:', err);
            setStatus('Click to start');
          });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setStatus('Paused');
    } else {
      audioRef.current.play().then(() => {
        setStatus('Now Streaming');
      }).catch((err) => {
        setStatus('Error: ' + err.message);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  return (
    <main className="player">
      <div className="logo">
        <h1>🎧 DJ Claw Radio</h1>
        <p>24/7 AI-Curated Music Stream</p>
      </div>

      <div className="visualizer">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`bar ${isPlaying ? 'playing' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <div className="controls">
        <div className="volume-container">
          <span>🔊</span>
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <span>{volume}%</span>
        </div>
      </div>

      <div className="track-info">
        <h2>{status}</h2>
        {tracklist && (
          <>
            <p>{tracklist.currentPlaylist || 'AI-Curated Billboard Hot 100'}</p>
            <p style={{ fontSize: '12px', marginTop: '5px', opacity: 0.6 }}>
              {tracklist.track_count || 0} tracks
            </p>
          </>
        )}
      </div>

      <div className={`status ${isPlaying ? 'online' : ''}`}>
        ● {status}
      </div>

      <audio
        ref={audioRef}
        src="https://djclaw.loca.lt/stream"
        autoPlay
        loop
        onPlaying={() => {
          setStatus('🎵 Now Streaming');
          setIsPlaying(true);
        }}
        onWaiting={() => setStatus('Buffering...')}
        onError={(e) => {
          console.error('Stream error:', e);
          setStatus('❌ Stream offline');
        }}
      />
    </main>
  );
}
