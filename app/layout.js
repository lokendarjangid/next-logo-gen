import "./globals.css";

export const metadata = {
  title: "AI Logo Generator",
  description: "Generate unique logos using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
