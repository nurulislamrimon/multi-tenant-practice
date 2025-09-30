import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { IDomain } from "@/interfaces/domain.interface";

const dataFile = path.join(process.cwd(), "domains.json");

export async function POST(req: NextRequest) {
  const { domain } = await req.json();
  console.log("Checking verification for domain:", domain);

  if (!domain) {
    console.log("Domain is required, but not provided.");
    return new NextResponse("Domain is required", { status: 400 });
  }

  try {
    // ✅ Read current file or init empty array
    let domains: IDomain[] = [];
    try {
      const file = await fs.readFile(dataFile, "utf-8");
      domains = JSON.parse(file);
    } catch (error) {
      console.error("Error reading domains.json:", error);
      domains = [];
    }

    const domainData = domains.find((d) => d.domain === domain);
    console.log("Found domain data:", domainData);

    if (
      !domainData ||
      !domainData.verificationToken ||
      !domainData.verificationRecordName
    ) {
      console.log("Verification data not found for this domain.");
      return new NextResponse("Verification data not found for this domain", {
        status: 400,
      });
    }

    const cfUrl = `https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/dns_records?type=TXT&name=${domainData.verificationRecordName}`;
    console.log("Fetching from Cloudflare URL:", cfUrl);

    const res = await fetch(cfUrl, {
      headers: {
        Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("Cloudflare API response:", data);

    if (!res.ok) {
      console.error("Cloudflare API request failed:", data);
      return NextResponse.json({ error: data }, { status: 500 });
    }

    const txtRecord = data.result.find(
      (record: Record<string, unknown>) =>
        record.content === domainData.verificationToken
    );
    console.log("Found TXT record:", txtRecord);

    if (txtRecord) {
      const domainIndex = domains.findIndex((d) => d.domain === domain);
      if (domainIndex > -1) {
        domains[domainIndex].status = "verified";
        delete domains[domainIndex].verificationToken;
        delete domains[domainIndex].verificationRecordName;
      }

      // ✅ Save back to file
      await fs.writeFile(dataFile, JSON.stringify(domains, null, 2));
      console.log("Domain verified successfully and domains.json updated.");

      return NextResponse.json({ message: "Domain verified successfully" });
    } else {
      console.log(
        "Domain verification failed. TXT record not found or content mismatch."
      );
      return NextResponse.json(
        { message: "Domain verification failed" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Request failed:", err);
    return new NextResponse("Failed to verify domain", { status: 500 });
  }
}
