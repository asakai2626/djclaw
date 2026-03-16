# DJ Claw Radio 🎧

AI-Powered 24/7 Music Streaming Radio

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📡 Stream URL

Set `NEXT_PUBLIC_STREAM_URL` in `.env.local`:

```env
NEXT_PUBLIC_STREAM_URL=https://your-stream-url/stream.mp3
```

## 🎵 Features

- ✅ AI-curated music selection
- ✅ Infinite loop streaming
- ✅ Real-time visualizer
- ✅ Volume control
- ✅ Mobile responsive
- ✅ Track list API

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (React)
- **Styling:** CSS (Glassmorphism)
- **Streaming:** Icecast / HTTP
- **AI:** OpenAI GPT-4o-mini

## 📡 API

### GET /api/tracklist

Returns current playlist:

```json
{
  "station": "DJ Claw Radio",
  "status": "online",
  "tracks": [...]
}
```

## 🚀 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/asakai2626/djclaw)

## 📝 License

MIT
