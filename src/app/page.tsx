import { headers } from "next/headers";
import Link from "next/link";
import { Tenant } from "../../interfaces/tenant.interface";
import { tenantData } from "../../constants/tenant.constant";

export default async function Page() {
  const header = await headers();
  const host = header.get("host") || "localhost";
  const domain = host.split(":")[0];
  const subExist = domain.split(".").length > 2;

  const getTheItem = (cond: (item: Tenant) => boolean): Tenant | undefined => {
    return tenantData.find(cond);
  };

  let tenant: Tenant | undefined;

  if (subExist) {
    const subdomain = domain.split(".")[0];
    tenant = getTheItem((item) => item.sub === subdomain);
  } else {
    tenant = getTheItem((item) => item.domain === domain);
  }

  const data = tenant?.data || {
    name: "Unknown",
    description: "No data found",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <p className="mt-4">{data.description}</p>
          <small>This is Automated CICD</small>
          <div className="mt-8">
            <Link href="/request-ssl" className="text-indigo-600 hover:text-indigo-900">
              Request SSL Certificate
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
