import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFile = path.join(process.cwd(), "domains.json");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const domain = formData.get("domain") as string;

  if (!domain) {
    return new NextResponse("Domain is required", { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/custom_hostnames`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hostname: domain,
          ssl: { method: "http", type: "dv" },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    // ✅ Build record
    const record = {
      domain,
      cloudflareId: data.result.id,
      status: data.result.ssl?.status || "pending",
      createdAt: new Date().toISOString(),
    };

    // ✅ Read current file or init empty array
    let domains: any[] = [];
    try {
      const file = await fs.readFile(dataFile, "utf-8");
      domains = JSON.parse(file);
    } catch {
      domains = [];
    }

    // ✅ Append new record
    domains.push(record);

    // ✅ Save back to file
    await fs.writeFile(dataFile, JSON.stringify(domains, null, 2));

    return NextResponse.json({
      message: "SSL request sent and saved",
      result: record,
    });
  } catch (err) {
    console.error("Request failed:", err);
    return new NextResponse("Failed to request SSL", { status: 500 });
  }
}
