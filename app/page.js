'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || 'هەڵەیەک ڕووی دا');
      }
    } catch (err) {
      setError('نەتوانرا پەیوەندی بە سێرڤەرەوە بپەسترێت');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>کــوردســتـان | Kurdistan</h1>
      <p style={{ marginBottom: '20px', color: '#94a3b8' }}>داگرتنی ڤیدیۆ لە فیسبووک، ئینستاگرام و تیک تۆک</p>

      <form onSubmit={handleDownload} style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '500px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="لینکی ڤیدیۆ لێرە پەیست بکە..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'خەریکی گەڕان...' : 'داگرتن'}
        </button>
      </form>

      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1e293b', borderRadius: '8px', maxWidth: '500px', width: '100%' }}>
          <h3 style={{ marginBottom: '15px' }}>{result.title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {result.downloads && result.downloads.map((dl, index) => (
              <a
                key={index}
                href={dl.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                style={{ display: 'block', padding: '10px', backgroundColor: '#10b981', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}
              >
                داگرتن ({dl.quality || 'کوالیتی بەرز'})
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
