# Cek SEO

AI-powered SEO analysis tool built with Next.js 14 + Prisma + OpenAI. Analyze any website's SEO health with automated crawling and AI-generated recommendations.

## Features

**AI SEO Analysis** — Enter any URL and get a comprehensive SEO analysis powered by AI (OpenAI). The system crawls the page, extracts meta tags, headings, links, and content structure, then generates actionable recommendations.

**Analysis Report** — Detailed breakdown of SEO factors with scores and suggestions. Export results as PDF for client reports.

**History & Tracking** — All analyses saved to SQLite via Prisma. Review past results and track improvements over time.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| AI SDK | @ai-sdk/openai (Vercel AI SDK) |
| Database | SQLite via Prisma ORM |
| Crawling | axios + jsdom |
| Validation | zod |
| PDF Export | @react-pdf/renderer, react-to-pdf |
| UI | Headless UI, Heroicons |
| Container | Docker + docker-compose + nginx |

## Quick Start

```bash
# Copy env and add your OpenAI API key
cp .env.example .env

# Install & run
pnpm install
pnpm prisma migrate dev
pnpm dev
```

## Docker

```bash
docker-compose up -d
```