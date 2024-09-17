import React from "react";
import MobileMenu from "./Mobile.Menu";
import { SEOAnalysisForm } from "./SEOAnalysisReport";

const navigation = [
  { name: "Konsultasi SEO", href: "/konsultasi-seo" },
  { name: "Blog SEO", href: "/blog-seo" },
  { name: "Kontak", href: "/kontak" },
];

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Cek SEO</span>
              <span className="font-bold text-xl text-blue-700">Cek SEO</span>
            </a>
          </div>
          <MobileMenu navigation={navigation} />
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700 transition duration-150 ease-in-out"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <span className="text-blue-700 font-bold">GRATIS - </span>
              Analisa SEO Online Profesional
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Cek SEO Website dan Dapatkan Feedback
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Gunakan AI SEO tools kami untuk mendapatkan informasi lengkap
              tentang kondisi SEO website Anda beserta feedback yang bisa Anda
              terapkan langsung.
            </p>
            <SEOAnalysisForm />
          </div>
        </div>
      </main>
    </div>
  );
}
