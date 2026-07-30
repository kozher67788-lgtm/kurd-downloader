'use client';
import React, { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    if (!url) return;
    setLoading(true);
    setTimeout(() => {
      setVideoData({
        title: "نموونەی ڤیدیۆ - All Video Downloader",
        thumbnail: "https://via.placeholder.com/640x360",
        duration: "03:45",
        formats: [
          { quality: "1080p Full HD", size: "45 MB" },
          { quality: "720p HD", size: "25 MB" },
          { quality: "Audio MP3", size: "3.5 MB" }
        ]
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4">
      <nav className="max-w-5xl mx-auto py-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          کــوردســتـان | Kurdistan
        </h1>
        <span className="bg-slate-800 text-xs px-3 py-1 rounded-full text-slate-300">v1.0</span>
      </nav>

      <main className="max-w-3xl mx-auto my-12 text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-extrabold">All Video Downloader Kurdish</h2>
        <p className="text-slate-400">داگرتنی ڕاستەوخۆی ڤیدیۆ لە سەرجەم سۆشیال میدیاکان بە بەرزترین کوالێتی</p>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              placeholder="لینکی ڤیدیۆ لێرە پەیست بکه..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
            />
            <button 
              onClick={handleFetch}
              className="bg-cyan-600 hover:bg-cyan-500 font-bold px-6 py-3 rounded-xl transition"
            >
              {loading ? "چاوەڕێ بکه..." : "داگرتن"}
            </button>
          </div>

          {videoData && (
            <div className="mt-6 border-t border-slate-800 pt-6 text-right space-y-4">
              <h3 className="font-bold text-lg">{videoData.title}</h3>
              <div className="space-y-2">
                {videoData.formats.map((f, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span>{f.quality} <span className="text-slate-500 text-sm">({f.size})</span></span>
                    <button className="bg-blue-600 text-xs px-4 py-2 rounded-lg">داگرتن</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
