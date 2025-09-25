import { headers } from "next/headers";

const tenantData: Record<string, { name: string; description: string }> = {
  client1: {
    name: "Client 1",
    description: "This is dummy data for Client 1 - Ata ki",
  },
  client2: { name: "Client 2", description: "This is dummy data for Client 2" },
  localhost: { name: "Local Dev", description: "Data for localhost" },
};

export default async function Page() {
  const header = await headers();
  const host = header.get("host") || "localhost";
  const subdomain = host.split(":")[0].split(".")[0];

  const data = tenantData[subdomain] || {
    name: "Unknown",
    description: "No data found",
  };

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <small>This is Automated CICD</small>
    </div>
  );
}
