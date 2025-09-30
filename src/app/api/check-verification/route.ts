import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cfUrl = `https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/dns_records?type=TXT`;

    const res = await fetch(cfUrl, {
      headers: {
        Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Cloudflare API request failed:", data);
      return NextResponse.json(
        {
          message: "Debug: Cloudflare API request failed",
          error: data,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "Debug mode is active. Check your server logs for the list of all TXT records from Cloudflare.",
      records: data.result,
    });
  } catch (err) {
    console.error("Request failed:", err);
    return new NextResponse("Failed to run debug check", { status: 500 });
  }
}
