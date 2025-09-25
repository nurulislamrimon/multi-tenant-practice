import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const domain = formData.get('domain') as string;

  if (!domain) {
    return new NextResponse('Domain is required', { status: 400 });
  }

  // Here you would typically make an API call to Cloudflare to request the SSL certificate.
  // This is a placeholder for that logic.
  console.log(`Requesting SSL for domain: ${domain}`);

  return new NextResponse('SSL request received', { status: 200 });
}
