import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Digital Life Lessons",
    template: "%s | Digital Life Lessons",
  },
  description:
    "Preserve your wisdom, document your journey, and share life lessons for future generations.",
  openGraph: {
    title: "Digital Life Lessons",
    description: "Preserve your wisdom for future generations.",
    siteName: "Digital Life Lessons",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}