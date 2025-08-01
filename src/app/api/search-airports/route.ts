// src/app/api/search-airports/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Get the search query from the incoming request URL
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  // 2. Construct the external API URL
  const externalApiUrl = `https://admin.airambulanceaviation.co.in/api/basesearch?query=${query}`;

  try {
    // 3. Fetch data from the external API
    const apiRes = await fetch(externalApiUrl);

    if (!apiRes.ok) {
      // If the external API returned an error, forward it
      return NextResponse.json(
        { error: "Failed to fetch data from external API" },
        { status: apiRes.status }
      );
    }

    // 4. Parse the JSON and return it to your client component
    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
