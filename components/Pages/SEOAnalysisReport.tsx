"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function SEOAnalysisForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();
      // Navigate to the results page with the analysis ID
      router.push(`/seo/${data.id}`);
    } catch (error) {
      setError("Failed to analyze URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center">
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
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Get Feedback"}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
