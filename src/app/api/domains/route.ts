import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const domainsFilePath = path.join(process.cwd(), "domains.json");

export async function GET() {
  try {
    const domainsFile = await fs.readFile(domainsFilePath, "utf8");
    const domains = JSON.parse(domainsFile);
    return NextResponse.json(domains);
  } catch (error) {
    console.error("Error reading domains file:", error);
    return NextResponse.json(
      { error: "Failed to read domains file" },
      { status: 500 }
    );
  }
}
