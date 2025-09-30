import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { IDomain } from "@/interfaces/domain.interface";

const dataFile = path.join(process.cwd(), "domains.json");

export async function POST(req: NextRequest) {
  const { domain } = await req.json();

  if (!domain) {
    return new NextResponse("Domain is required", { status: 400 });
  }

  const recordName = `_gemini-verification.${domain}`;
  const verificationToken = crypto.randomBytes(32).toString("hex");

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/dns_records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "TXT",
          name: recordName,
          content: verificationToken,
          ttl: 60, // 1 minute
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    // ✅ Read current file or init empty array
    let domains: IDomain[] = [];
    try {
      const file = await fs.readFile(dataFile, "utf-8");
      domains = JSON.parse(file);
    } catch {
      domains = [];
    }

    const domainIndex = domains.findIndex((d) => d.domain === domain);

    if (domainIndex > -1) {
      domains[domainIndex].verificationRecordName = recordName;
      domains[domainIndex].verificationToken = verificationToken;
    }

    // ✅ Save back to file
    await fs.writeFile(dataFile, JSON.stringify(domains, null, 2));

    return NextResponse.json({
      message: "Verification token generated and saved",
      token: verificationToken,
      name: recordName,
    });
  } catch (err) {
    console.error("Verification failed:", err);
    return new NextResponse("Failed to generate verification token", {
      status: 500,
    });
  }
}
