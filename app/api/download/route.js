import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'تکایە لینکێک بنووسە' }, { status: 400 });
    }

    // بانگهێشتکردنی API بۆ وەرگرتنی لینکی ڕاستەوخۆی ڤیدیۆ
    const response = await fetch(`https://api.vkrdown.com/api/main?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data && data.status === 200) {
      return NextResponse.json({
        success: true,
        title: data.data.title || 'Video',
        downloads: data.data.downloads || []
      });
    } else {
      return NextResponse.json({ error: 'نەتوانرا ڤیدیۆکە بدۆزرێتەوە، دڵنیابەوە لە لینکەکە' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'کێشەیەک لە سێرڤەر ڕووی دا' }, { status: 500 });
  }
}
