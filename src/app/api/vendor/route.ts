import { NextResponse } from "next/server";

/**
 * This route acts as a server-side proxy to the external vendor API.
 * It forwards requests from the frontend to the AWS API and pipes the
 * response back, avoiding CORS issues and hiding the external URL.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const externalApiUrl =
      "https://ow91reoh80.execute-api.ap-south-1.amazonaws.com/air/service-vendor";

    const apiResponse = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // **FIXED: Instead of parsing JSON here, act as a true proxy.**
    // Get the raw response body, status, and headers.
    const responseBody = await apiResponse.text();
    const responseStatus = apiResponse.status;
    const responseHeaders = {
      "Content-Type": apiResponse.headers.get("Content-Type") || "text/plain",
    };

    // Return a new response, passing through the body, status, and headers
    // from the external API directly to our frontend client.
    return new NextResponse(responseBody, {
      status: responseStatus,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error("API Route Proxy Error:", error);
    return NextResponse.json(
      {
        message: "An internal server error occurred in the proxy.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
