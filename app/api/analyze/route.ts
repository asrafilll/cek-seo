import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import axios from "axios";
import { JSDOM } from "jsdom";
import { z } from "zod";
import prisma from "@/prisma";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

async function crawl(url: string) {
  const response = await axios.get(url);
  return response.data;
}

function extractData(html: string, url: string) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  return {
    url: url,
    title: document.title,
    metaDescription:
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || "",
    headers: Array.from(document.querySelectorAll("h1, h2, h3")).map(
      (el: any) => el.textContent
    ),
    mainHeadline: document.querySelector("h1")?.textContent || "",
    cta:
      document.querySelector("a.cta, button.cta")?.textContent ||
      "No clear CTA found",
  };
}

const analysisSchema = z.object({
  titleTagAnalysis: z.object({
    currentValue: z.string(),
    analysis: z.string(),
    score: z.number().min(0).max(10),
  }),
  metaDescriptionAnalysis: z.object({
    currentValue: z.string(),
    analysis: z.string(),
    score: z.number().min(0).max(10),
  }),
  headersAnalysis: z.object({
    currentValue: z.array(z.string()),
    analysis: z.string(),
    score: z.number().min(0).max(10),
  }),
  mainHeadlineAnalysis: z.object({
    currentValue: z.string(),
    analysis: z.string(),
    score: z.number().min(0).max(10),
  }),
  ctaAnalysis: z.object({
    currentValue: z.string(),
    analysis: z.string(),
    score: z.number().min(0).max(10),
  }),
  contentAnalysis: z.object({
    analysis: z.string(),
    score: z.number().min(0).max(10),
  }),
  userExperienceAnalysis: z.object({
    analysis: z.string(),
    score: z.number().min(0).max(10),
  }),
  mobileOptimizationTips: z.string(),
  loadSpeedSuggestions: z.string(),
  keywordUsageAnalysis: z.object({
    analysis: z.string(),
    score: z.number().min(0).max(10),
  }),
  recommendations: z.array(z.string()),
  easyWins: z.array(z.string()),
  longTermStrategies: z.array(z.string()),
  additionalInsights: z.string(),
  overallScore: z.number().min(0).max(100),
  scoreSummary: z.string(),
});

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  try {
    // Crawl the webpage
    const html = await crawl(url);
    const pageData = extractData(html, url);

    // Generate analysis using AI
    const { object: analysis } = await generateObject({
      model: openai("gpt-4-turbo"),
      schema: analysisSchema,
      system: `Act as an expert in SEO, Digital Marketing, and Web Development with years of experience in optimizing landing pages for various industries. Your task is to analyze the given landing page data and provide detailed, actionable insights and recommendations for improvement.

      Your analysis should be:
      1. Comprehensive: Cover all aspects of SEO, copywriting, user experience, and conversion optimization.
      2. Detailed: Provide specific examples and explanations for each point.
      3. Easy to understand: Use simple language and avoid technical jargon. When you must use technical terms, explain them briefly.
      4. Actionable: Offer clear, step-by-step recommendations that non-technical users can implement.
      5. Prioritized: Distinguish between quick wins and long-term strategies.
      6. Bahasa Indonesia: Provide all explanations and recommendations in Bahasa Indonesia to ensure local relevance and ease of understanding.
      
      For each aspect of the analysis, first state the current value from the website, then provide your analysis and recommendations. Score each aspect on a scale of 0-10, where 0 is very poor and 10 is excellent.
      
      At the end of the analysis, provide an overall score out of 100, calculated as the sum of all individual scores. Also, provide a brief summary of the overall score, highlighting the strongest and weakest areas.
      
      Focus on practical advice that will have the most significant impact on the page's performance in terms of search engine rankings, user engagement, and conversion rates.`,
      prompt: `Analyze the following landing page data thoroughly:
      
      URL: ${pageData.url}
      Title Tag: "${pageData.title}"
      Meta Description: "${pageData.metaDescription}"
      Headers: ${JSON.stringify(pageData.headers)}
      Main Headline: "${pageData.mainHeadline}"
      CTA: "${pageData.cta}"
      
      Please provide a comprehensive analysis covering:
      
      1. Title Tag: State the current title tag, assess its effectiveness, keyword usage, and length. Suggest improvements. Score out of 10.
      2. Meta Description: State the current meta description, evaluate its appeal, keyword inclusion, and character count. Offer enhancements. Score out of 10.
      3. Headers: List the current headers, analyze the structure, hierarchy, and keyword usage. Recommend optimizations. Score out of 10.
      4. Main Headline: State the current main headline, examine its impact, clarity, and alignment with the page's purpose. Propose refinements. Score out of 10.
      5. CTA (Call-to-Action): State the current CTA, assess its visibility, persuasiveness, and placement. Suggest improvements. Score out of 10.
      6. Content Analysis: Evaluate the overall content quality, relevance, and engagement potential. Score out of 10.
      7. User Experience: Analyze the page layout, readability, and navigation. Offer UX improvement tips. Score out of 10.
      8. Mobile Optimization: Provide suggestions for enhancing mobile user experience.
      9. Load Speed: Offer general recommendations for improving page load time.
      10. Keyword Usage: Analyze the overall keyword strategy and suggest improvements. Score out of 10.
      
      For each aspect, provide:
      - Current value (where applicable)
      - Detailed analysis
      - Specific recommendations
      - Score out of 10
      
      Additionally:
      - Offer any other insights or recommendations that could significantly improve the landing page's performance.
      - Provide an overall score out of 100 (sum of all individual scores).
      - Give a brief summary of the overall score, highlighting strengths and areas for improvement.
      
      Remember to present all information in Bahasa Indonesia, using clear and simple language that non-technical users can easily understand and apply.`,
    });

    // Save the analysis to the database
    const website = await prisma.website.upsert({
      where: { url: url },
      update: {},
      create: { url: url },
    });

    const savedAnalysis = await prisma.analysis.create({
      data: {
        websiteId: website.id,
        data: JSON.stringify(analysis),
      },
    });

    return NextResponse.json({
      ...analysis,
      id: savedAnalysis.id,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
