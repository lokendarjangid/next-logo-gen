import React from "react";
import LogoGenerator from "./components/logo-gen";

export const metadata = {
  title: 'AI Logo Generator',
  description: 'Generate unique logos using AI',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-6 md:py-12 px-3 md:px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        AI Logo Generator
      </h1>
      <LogoGenerator />
    </main>
  );
}
