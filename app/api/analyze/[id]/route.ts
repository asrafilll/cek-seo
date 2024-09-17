import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const analysis = await prisma.analysis.findUnique({
      where: { id },
      include: { website: true },
    });

    if (!analysis) {
      return NextResponse.json(
        { message: "Analysis not found" },
        { status: 404 }
      );
    }

    // Parse the data field if it's stored as a JSON string
    const parsedData = JSON.parse(analysis.data);

    return NextResponse.json({
      id: analysis.id,
      websiteUrl: analysis.website.url,
      createdAt: analysis.createdAt,
      ...parsedData,
    });
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return NextResponse.json(
      { message: "Error fetching analysis" },
      { status: 500 }
    );
  }
}
