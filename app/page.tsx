'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [status, setStatus] = useState('⏳ Connecting...');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracklist, setTracklist] = useState<any>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Auto-start
  useEffect(() => {
    // Fetch tracklist
    fetch('/api/tracklist')
      .then(r => r.json())
      .then(data => setTracklist(data))
      .catch(() => {});

    // Auto-play
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setStatus('🎵 Now Streaming');
          })
          .catch(() => {
            setStatus('⚠️ Click to start');
          });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
          <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
            {tracklist.track_count || 0} tracks
          </p>
        )}
      </div>

      <div className={`status ${isPlaying ? 'online' : ''}`}>
        ● {status}
      </div>

      <audio
        ref={audioRef}
        src="https://djclaw.loca.lt/stream"
        autoPlay
        onPlaying={() => {
          setStatus('🎵 Now Streaming');
          setIsPlaying(true);
        }}
        onWaiting={() => setStatus('⏳ Buffering...')}
        onError={() => setStatus('❌ Stream offline')}
      />
    </main>
  );
}
