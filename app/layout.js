import content from '../content.json';
import './globals.css';

export const metadata = { title: content.meta.title, description: content.meta.description };
export const viewport = { themeColor: '#0f0f0f' };

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Martian+Mono:wght@400..500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
