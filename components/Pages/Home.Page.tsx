"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, Bars3Icon, CheckIcon } from "@heroicons/react/16/solid";

const navigation = [
  { name: "Konsultasi SEO", href: "/konsultasi-seo" },
  { name: "Blog SEO", href: "/blog-seo" },
  { name: "Kontak", href: "/kontak" },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted URL:", url);
  };

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
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
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
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Cek SEO</span>
                <span className="font-bold text-xl text-blue-700">Cek SEO</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
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
            <div className="mt-10 flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-[35rem] flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <div className="w-full sm:flex-grow">
                  <label htmlFor="url" className="sr-only">
                    URL Website
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="www.yourwebsite.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-none rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-150 ease-in-out"
                >
                  <CheckIcon
                    className="h-5 w-5 inline-block mr-2"
                    aria-hidden="true"
                  />
                  Get Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
