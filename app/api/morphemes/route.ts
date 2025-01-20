import { NextRequest, NextResponse } from "next/server";

const openApiURL = process.env.ETRI_AIOPEN_URL || "http://aiopen.etri.re.kr:8000/WiseNLU";
const accessKey = process.env.ETRI_AIOPEN_ACCESSKEY;
const analysisCode = process.env.ETRI_AIOPEN_ANALYSISCODE;

interface Morp {
  id: number;
  lemma: string;
  type: string;
  position: number;
  weight: number;
}

interface Sentence {
  id: number;
  reserve_str: string;
  text: string;
  morp: Morp[];
}

interface ApiResponse {
  result: number;
  return_object: {
    doc_id: string;
    DCT: string;
    category: string;
    category_weight: number;
    title: { text: string; NE: string };
    metaInfo: Record<string, unknown>;
    paragraphInfo: unknown[];
    sentence: Sentence[];
    entity: unknown[];
  };
}

function extractLemmasFromApiResponse(response: ApiResponse): string[] {
  if (!response || !response.return_object || !response.return_object.sentence) {
    return [];
  }
  return response.return_object.sentence.flatMap(sentence =>
    sentence.morp ? sentence.morp.map(morp => morp.lemma) : []
  );
}

async function callApi(text: string): Promise<ApiResponse> {
  const requestJson = {
    argument: {
      text,
      analysis_code: analysisCode,
    },
  };

  const response = await fetch(openApiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessKey && { Authorization: accessKey }),
    },
    body: JSON.stringify(requestJson),
  });

  if (!response.ok) {
    throw new Error(`ETRI API Error: ${response.statusText}`);
  }

  return await response.json();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  if (!text) {
    return NextResponse.json(
      { error: "Query parameter 'text' is required" },
      { status: 400 }
    );
  }

  try {
    const data = await callApi(text);

    if (!data.return_object.sentence || data.return_object.sentence.length === 0) {
      return NextResponse.json(
        { error: "No data found in API response" },
        { status: 400 }
      );
    }

    const lemmas = extractLemmasFromApiResponse(data);
    console.log("Lemmas:", lemmas);
    return NextResponse.json(lemmas);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
