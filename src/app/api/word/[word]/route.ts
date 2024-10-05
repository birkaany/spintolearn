import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const { MERRIAM_LEARNERS_BASE_URL, MERIAM_LEARNERS_API_KEY } = process.env;

  const word = params.word;
  const fetchURL = `${MERRIAM_LEARNERS_BASE_URL}/${word}?key=${MERIAM_LEARNERS_API_KEY}`;
  const res = await fetch(fetchURL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
