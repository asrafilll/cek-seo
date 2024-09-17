import AnalysisResults from "@/components/Components/AnalysisResult";

async function getAnalysis(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analyze/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch analysis");

  const data = await response.json();
  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const analysisData = await getAnalysis(id);

  console.log(analysisData);

  if (!analysisData) {
    return <div>Analysis not found</div>;
  }

  return <AnalysisResults analysisData={analysisData} />;
}
