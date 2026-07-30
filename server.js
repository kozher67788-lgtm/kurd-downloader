const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

// API Endpoint بۆ بەدەستهێنانی زانیاری ڤیدیۆ
app.post('/api/fetch-info', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'تکایە لینکێک بنێرە' });
    }

    // بەکارهێنانی yt-dlp بۆ بەدەستهێنانی زانیاری لە شێوەی JSON
    const command = `yt-dlp -j "${url}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'نەتوانرا زانیاری ڤیدیۆکە بهێندرێت' });
        }

        const data = JSON.parse(stdout);
        
        // شیکارکردنی ئەنجامەکە
        const result = {
            title: data.title,
            thumbnail: data.thumbnail,
            duration: data.duration_string,
            formats: data.formats
                .filter(f => f.ext === 'mp4' && f.vcodec !== 'none')
                .map(f => ({
                    quality: f.format_note || `${f.height}p`,
                    url: f.url,
                    ext: f.ext
                }))
        };

        res.json(result);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
