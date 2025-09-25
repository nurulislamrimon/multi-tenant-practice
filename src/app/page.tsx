import { headers } from "next/headers";
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
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <small>This is Automated CICD</small>
    </div>
  );
}
