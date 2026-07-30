import './globals.css';

export const metadata = {
  title: 'All Video Downloader Kurdish',
  description: 'کـــوردســتـان | Kurdistan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ckb" dir="rtl">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
