"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "../Components/Card";
import { usePDF } from "react-to-pdf";

interface AnalysisData {
  [key: string]: any;
}

export function AnalysisResults({
  analysisData,
}: {
  analysisData: AnalysisData;
}) {
  const { toPDF, targetRef } = usePDF({ filename: "seo-analysis-report.pdf" });

  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-5">
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div>
          {Object.entries(value).map(([key, val]) => (
            <p key={key}>
              <strong>{key}:</strong> {String(val)}
            </p>
          ))}
        </div>
      );
    } else {
      return <p>{String(value)}</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div ref={targetRef} className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">SEO Analysis Report</h1>

        {analysisData.overallScore && analysisData.scoreSummary && (
          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Overall Score: {analysisData.overallScore}/100
            </h2>
            <p>{analysisData.scoreSummary}</p>
          </div>
        )}

        {Object.entries(analysisData).map(([key, value]) => {
          if (key === "overallScore" || key === "scoreSummary") return null;

          return (
            <Card key={key} className="mb-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">
                  {key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                </h2>
              </CardHeader>
              <CardContent>{renderValue(value)}</CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => toPDF()}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition duration-150 ease-in-out"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
}

export default AnalysisResults;
