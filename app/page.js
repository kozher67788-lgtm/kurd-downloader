import React, { useState } from 'react';
import { 
  FaFacebook, FaInstagram, FaTiktok, FaYoutube, 
  FaTwitter, FaSnapchat, FaVimeo, FaPinterest, 
  FaDownload, FaPaste, FaHistory, FaHeart, FaGlobe 
} from 'react-icons/fa';
import { SiThreads, SiDailymotion } from 'react-icons/si';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('CKB');

  // پشتگیریکراوەکان بۆ بەشی Infographic
  const platforms = [
    { name: 'YouTube', icon: <FaYoutube className="text-red-500" /> },
    { name: 'Instagram', icon: <FaInstagram className="text-pink-500" /> },
    { name: 'TikTok', icon: <FaTiktok className="text-cyan-400" /> },
    { name: 'Facebook', icon: <FaFacebook className="text-blue-600" /> },
    { name: 'X (Twitter)', icon: <FaTwitter className="text-blue-400" /> },
    { name: 'Threads', icon: <SiThreads className="text-white" /> },
    { name: 'Snapchat', icon: <FaSnapchat className="text-yellow-400" /> },
    { name: 'Vimeo', icon: <FaVimeo className="text-cyan-500" /> },
    { name: 'Dailymotion', icon: <SiDailymotion className="text-blue-500" /> },
    { name: 'Pinterest', icon: <FaPinterest className="text-red-600" /> },
  ];

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setUrl(text);
  };

  const handleFetch = () => {
    if (!url) return;
    setLoading(true);
    // لێرەدا پەیوەندی بە API بەشی Backend دەکرێت
    setTimeout(() => {
      setVideoData({
        title: "نموونەی ڤیدیۆ - All Video Downloader",
        thumbnail: "https://via.placeholder.com/640x360",
        duration: "03:45",
        formats: [
          { quality: "1080p Full HD", size: "45 MB", type: "mp4" },
          { quality: "720p HD", size: "25 MB", type: "mp4" },
          { quality: "480p SD", size: "12 MB", type: "mp4" },
          { quality: "Audio MP3", size: "3.5 MB", type: "mp3" },
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              كــوردســتـان | Kurdistan
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'CKB' ? 'ENG' : 'CKB')}
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700 transition"
            >
              <FaGlobe /> <span>{lang}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Header Section */}
        <section className="text-center space-y-4 mb-10 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">
            داگرتنی گشتگیر بۆ سەرجەم سۆشیال میدیاکان
          </h2>
          <p className="text-slate-400 text-lg">
            لینکەکەت لە خوارەوە پەیست بکە بۆ داگرتنی ڕاستەوخۆی ڤیدیۆ و دەنگ بە بەرزترین کوالێتی
          </p>
        </section>

        {/* Downloader Glassmorphism Card */}
        <section className="backdrop-blur-xl bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-2xl mb-16">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="لینکی ڤیدیۆکە لێرە پەیست بکە..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-700/60 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 text-slate-100 placeholder-slate-500 transition"
              />
              <button 
                onClick={handlePaste}
                className="absolute left-3 top-3.5 text-slate-400 hover:text-cyan-400 transition"
                title="Paste"
              >
                <FaPaste size={20} />
              </button>
            </div>
            <button 
              onClick={handleFetch}
              disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaDownload /> داگرتن
                </>
              )}
            </button>
          </div>

          {/* Video Result Preview */}
          {videoData && (
            <div className="mt-8 pt-8 border-t border-slate-800 grid md:grid-cols-2 gap-6 animate-fade-in">
              <div className="rounded-xl overflow-hidden border border-slate-800 relative group">
                <img src={videoData.thumbnail} alt="Preview" className="w-full h-auto object-cover" />
                <span className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-1 rounded text-xs">
                  {videoData.duration}
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-xl">{videoData.title}</h3>
                <div className="space-y-2">
                  {videoData.formats.map((fmt, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-950/40 p-3 rounded-lg border border-slate-800/50 hover:border-slate-700 transition">
                      <div>
                        <span className="font-bold text-cyan-400">{fmt.quality}</span>
                        <span className="text-slate-500 text-sm mr-2">({fmt.size})</span>
                      </div>
                      <a href="#" className="bg-slate-800 hover:bg-cyan-600 text-sm px-4 py-1.5 rounded-md transition flex items-center gap-2">
                        <FaDownload size={12} /> داگرتن
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Infographic Section - Supported Platforms */}
        <section className="space-y-6 mb-16">
          <h3 className="text-2xl font-bold text-center text-slate-200">سۆشیال میدیا پشتگیریکراوەکان</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {platforms.map((p, i) => (
              <div key={i} className="backdrop-blur-md bg-slate-900/30 border border-slate-800/60 p-4 rounded-xl flex items-center gap-3 hover:scale-105 hover:border-cyan-500/50 transition duration-300 cursor-pointer">
                <span className="text-2xl">{p.icon}</span>
                <span className="font-medium text-slate-300">{p.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense Ready Container */}
        <div className="w-full bg-slate-900/20 border border-slate-800/40 rounded-xl p-4 text-center text-slate-600 mb-12 min-h-[90px] flex items-center justify-center">
          بەشی ڕیکلام (AdSense Placeholder)
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-cyan-400 transition">دربارە (About)</a>
            <a href="#" className="hover:text-cyan-400 transition">یاسای تایبەتمەندی (Privacy)</a>
            <a href="#" className="hover:text-cyan-400 transition">مەرجەکان (Terms)</a>
            <a href="#" className="hover:text-cyan-400 transition">پەیوەندی (Contact)</a>
            <a href="#" className="hover:text-cyan-400 transition">DMCA</a>
          </div>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} All Video Downloader Kurdish. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
