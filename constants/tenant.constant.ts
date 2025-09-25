import { Tenant } from "../interfaces/tenant.interface";

export const tenantData: Tenant[] = [
  {
    domain: "lvh.me",
    sub: "main",
    data: {
      name: "lvh.me / main",
      description: "This is dummy data for Client 1",
    },
  },
  {
    domain: "sub.arabcoupondaily.com",
    sub: "arab",
    data: {
      name: "sub.arabcoupondaily.com / arab",
      description: "This is dummy data for Client 2",
    },
  },
  {
    domain: "localhost",
    sub: "local",
    data: {
      name: "localhost / local",
      description: "This is dummy data for Client 3",
    },
  },
];
